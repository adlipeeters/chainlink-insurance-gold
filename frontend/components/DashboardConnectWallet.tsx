import React from 'react'
import useWalletStore from '@/store/wallet';

import { connectWallet, disconnectWallet, changeWallet } from '@/services/old_blockchain'
import { Button } from './ui/button';
import { Wallet } from 'lucide-react';
import { truncate } from '@/utils/functions';

const DashboardConnectWallet = () => {
    const { wallet, setWallet } = useWalletStore();
    return (
        <>
            {wallet ? (
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        className='flex items-center gap-2'
                        onClick={changeWallet}>
                        <Wallet className='w-4 h-4' />
                        <span className='hidden md:block'>
                            {truncate({ text: wallet, startChars: 6, endChars: 4, maxLength: 16 })}
                        </span>
                    </Button>
                </div>
            ) : (
                <Button
                    variant="outline"
                    className='flex items-center gap-2'
                    onClick={connectWallet}>
                    <Wallet className='w-4 h-4' />
                    <span className='hidden md:block'>
                        Connect Wallet
                    </span>
                </Button>
            )
            }
        </>
    )
}

export default DashboardConnectWallet