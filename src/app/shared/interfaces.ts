import { Timestamp } from "firebase/firestore";


export interface State {
    configuration: Configuration;
    loading: boolean;
    readMoreType: ReadMoreType;
}

export interface Configuration {
    loaded: boolean,
    seminar: {
        active: boolean,
        date: Timestamp
    },
    pricing: Pricing[];
}

export interface Pricing {
    active: boolean;
    id: string;
    price: number;
}

export type ReadMoreType = 'history' | 'benefits' | 'mma' | 'agustin';