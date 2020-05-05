export interface HDNodeProps { 
    HDNode: any;
    DerivationPath: string;
}

export interface Token { 
    address: string;
    name: string;
    symbol: string;
    decimals: number;
    balance?: number;
}