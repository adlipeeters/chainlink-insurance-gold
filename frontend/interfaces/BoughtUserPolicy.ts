import { SystemPolicy } from "./SystemPolicy";

// export interface BoughtUserPolicy extends Omit<SystemPolicy, 'name' | 'description' | 'image' | 'active' | 'duration'> {
export interface BoughtUserPolicy {
    id: number;
    threshold: number;
    price: number;
    startDate: number | string | Date;
    endDate: number | string | Date;
    policyAddress: string;
    policyHolder: string;
    policyId: number;
    policyActive: boolean;
    payoutTriggered: boolean;
}