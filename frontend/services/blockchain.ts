import { ethers } from 'ethers'
import abi from '@/contracts/PolicyFactory.sol/PolicyFactory.json'
import useWalletStore from '@/store/wallet';
import { config } from 'dotenv';
import { constants } from '@/utils/constants';
import useSystemPoliciesStore from '@/store/policies';
import { toWei } from '@/utils/functions';
import { formatBoughtPolicies, formatSystemPolicies } from './blockchain-helper';
import { SystemPolicy } from '@/interfaces/SystemPolicy';

config();

const { setWallet } = useWalletStore.getState();
const ContractAbi = abi.abi

// !TODO
let ethereum: any
// !TODO
let tx: ethers.providers.TransactionResponse | null



if (typeof window !== 'undefined') {
    ethereum = (window as any).ethereum
}

const getReadOnlyContract = async () => {
    const provider = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_APP_RPC_URL);
    const readOnlyContract = new ethers.Contract(constants.contractAddress, ContractAbi, provider);
    return readOnlyContract;
}

const getWriteContract = async () => {
    if (!ethereum) {
        return reportError("Ethereum provider not found. Please install MetaMask or a similar wallet.");
    }
    const provider = new ethers.providers.Web3Provider(ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const writeContract = new ethers.Contract(constants.contractAddress, ContractAbi, signer);
    return writeContract;
}


export const connectWallet = async () => {
    console.log('Connecting wallet...')
    try {
        if (!ethereum) return reportError('Please install Metamask')
        const accounts = await ethereum.request?.({ method: 'eth_requestAccounts' })
        setWallet(accounts?.[0])
    } catch (error) {
        reportError(error)
    }
}

export const disconnectWallet = async () => {
    try {
        if (!ethereum) return reportError('Please install Metamask');

        setWallet('');

        ethereum.removeAllListeners('accountsChanged');
        ethereum.removeAllListeners('chainChanged');

        console.log('Wallet disconnected');
    } catch (error) {
        reportError(error);
    }
}

export const changeWallet = async () => {
    try {
        console.log('Ethereum object:', ethereum);
        if (!ethereum) return reportError('Please install MetaMask');

        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        if (!accounts || accounts.length === 0) return reportError('No accounts returned');
        setWallet(accounts[0]);
        console.log('Wallet changed to:', accounts[0]);
    } catch (error) {
        console.error('Error changing wallet:', error);
        reportError(error);
    }
};


export const checkWallet = async () => {
    try {
        if (!ethereum) return reportError('Please install Metamask')
        const accounts = await ethereum.request?.({ method: 'eth_accounts' })

        ethereum.on('chainChanged', () => {
            window.location.reload();
        })

        ethereum.on('accountsChanged', async () => {
            window.location.reload();
        })

        if (accounts?.length) {
            setWallet(accounts[0]);
            getUserPolicies();
        } else {
            setWallet('')
            reportError('Please connect wallet, no accounts found.')
        }
    } catch (error) {
        reportError(error)
    }
}

export const getSystemPolicies = async () => {
    const contract = await getReadOnlyContract()
    const systemPolicies = await contract.getAllFactoryPolicies();
    const formattedPolicies = formatSystemPolicies(systemPolicies);
    useSystemPoliciesStore.getState().setSystemPolicies(formattedPolicies);

    return true;
}

export const getAllActiveInsurances = async () => {
    const contract = await getReadOnlyContract();
    const policies = await contract.getAllActiveFactoryPolicies();
    const formattedPolicies = formatSystemPolicies(policies);
    useSystemPoliciesStore.getState().setActivePoliciesForSale(formattedPolicies);

    return true;
}

export const getAllUsersPolicies = async () => {
    const contract = await getReadOnlyContract()
    const userPolicies = await contract.getAllUsersPolicies();
    const formattedUserPolicies = formatBoughtPolicies(userPolicies);
    useSystemPoliciesStore.getState().setBoughtPolicies(formattedUserPolicies);

    return true;
}

export const getFactoryPolicy = async (id: number) => {
    const contract = await getReadOnlyContract()
    const policy = await contract.getFactoryPolicy(id);
    const formattedPolicy = formatSystemPolicies([policy])[0];
    return formattedPolicy;
}

export const getUserPolicies = async () => {
    const wallet = useWalletStore.getState().wallet;
    if (!ethereum || !wallet) return reportError('Please install Metamask');
    const contract = await getReadOnlyContract()
    const userPolicies = await contract.getUserPolicies(wallet);
    const formattedUserPolicies = formatBoughtPolicies(userPolicies);
    useSystemPoliciesStore.getState().setUserPolicies(formattedUserPolicies);

    return true;
}

export const createPolicy = async ({
    price,
    threshold,
    duration,
    maxPayout,
    name,
    description,
    image
}: Omit<SystemPolicy, 'id' | 'active'>) => {
    try {
        if (!ethereum) return reportError('Please install Metamask');
        const contract = await getWriteContract();
        if (!contract) return reportError("Error creating contract");
        tx = await contract.createPolicy(
            toWei(price),
            threshold,
            duration,
            toWei(maxPayout),
            name,
            description,
            image
        )

        tx?.wait().then(async () => {
            await getSystemPolicies();
        })

    } catch (error) {
        reportError(error)
    }
}

export const editPolicy = async ({
    id,
    price,
    threshold,
    duration,
    maxPayout,
    name,
    description,
    image
}: Omit<SystemPolicy, 'active'>) => {
    try {
        if (!ethereum) return reportError('Please install Metamask');
        const contract = await getWriteContract();
        if (!contract) return reportError("Error editing contract");
        tx = await contract.editSystemPolicy(
            id,
            toWei(price),
            threshold,
            duration,
            toWei(maxPayout),
            name,
            description,
            image
        )

        tx?.wait().then(async () => {
            await getSystemPolicies();
        })

    } catch (error) {
        reportError(error)
    }
}

export const togglePolicyStatus = async (id: number) => {
    try {
        if (!ethereum) return reportError('Please install Metamask');
        const contract = await getWriteContract();
        if (!contract) return reportError("Error toggling policy status");
        tx = await contract.togglePolicy(id)

        tx?.wait().then(async () => {
            await getSystemPolicies();
        })

    } catch (error) {
        reportError(error)
    }
}

export const buyInsurance = async (id: number, price: number) => {
    try {
        if (!ethereum) return reportError('Please install Metamask');
        const contract = await getWriteContract();
        if (!contract) return reportError("Error buying insurance");
        tx = await contract.buyPolicy(id, {
            value: toWei(price)
        })

        tx?.wait().then(async () => {
            // await getSystemPolicies();
        })

    } catch (error) {
        console.log('Error buying insurance:', error)
        reportError(error)
    }
}
