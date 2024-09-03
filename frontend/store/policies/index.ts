import { BoughtUserPolicy } from '@/interfaces/BoughtUserPolicy';
import { SystemPolicy } from '@/interfaces/SystemPolicy';
import { create } from 'zustand';

export interface LotteryState {
    systemPolicies: SystemPolicy[];
    activePoliciesForSale: SystemPolicy[];
    boughtPolicies: BoughtUserPolicy[];
    userPolicies: BoughtUserPolicy[];
    setSystemPolicies: (policies: SystemPolicy[]) => void;
    setActivePoliciesForSale: (policies: SystemPolicy[]) => void;
    setBoughtPolicies: (policies: BoughtUserPolicy[]) => void;
    setUserPolicies: (policies: BoughtUserPolicy[]) => void;
}

const usePolicies = create<LotteryState>((set) => ({
    systemPolicies: [],
    activePoliciesForSale: [],
    boughtPolicies: [],
    userPolicies: [],
    setSystemPolicies: (policies) => set({ systemPolicies: policies }),
    setActivePoliciesForSale: (policies) => set({ activePoliciesForSale: policies }),
    setBoughtPolicies: (policies) => set({ boughtPolicies: policies }),
    setUserPolicies: (policies) => set({ userPolicies: policies }),
}));

export default usePolicies;
