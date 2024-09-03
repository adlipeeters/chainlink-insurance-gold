export interface SystemPolicy {
    id: number;
    price: number;
    threshold: number;
    duration: number;
    maxPayout: number;
    active: boolean;
    name: string;
    description: string;
    image: string;
}