import { BoughtUserPolicy } from "@/interfaces/BoughtUserPolicy";
import { SystemPolicy } from "@/interfaces/SystemPolicy";
import { convertMilisecondsToDays, fromWei, timestampToDate } from "@/utils/functions"

export const formatSystemPolicies = (insurances: SystemPolicy[]): SystemPolicy[] => {
    return insurances.map((insurance) => {
        return {
            id: Number(insurance.id),
            price: parseFloat(fromWei(insurance.price)),
            threshold: Number(insurance.threshold),
            duration: convertMilisecondsToDays(Number(insurance.duration)),
            maxPayout: parseFloat(fromWei(insurance.maxPayout)),
            active: insurance.active,
            name: insurance.name,
            description: insurance.description,
            image: insurance.image
        }
    });
}
export const formatBoughtPolicies = (insurances: BoughtUserPolicy[]): BoughtUserPolicy[] => {
    try {

        return insurances.map((insurance) => {
            return {
                id: Number(insurance.id),
                policyId: Number(insurance.policyId),
                price: parseFloat(fromWei(insurance.price)),
                threshold: Number(insurance.threshold),
                startDate: timestampToDate(Number(insurance.startDate)),
                endDate: timestampToDate(Number(insurance.endDate)),
                policyAddress: insurance.policyAddress,
                policyHolder: insurance.policyHolder,
                policyActive: insurance.policyActive,
                payoutTriggered: insurance.payoutTriggered,
            }
        });
    } catch (error) {
        console.log(error)
        return []
    }
}