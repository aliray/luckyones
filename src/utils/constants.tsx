
import erc20Abi from '@/abi/erc20.json';
import LotteryAbi from '@/abi/Lottx.json';


export const GRAPH_API_LOTTERY = null; // "http://192.168.0.103:8000/subgraphs/name/luckyx/luckyx_subgraph_02";

// ZERO ADDRESS USED FOR CALL CONTRACT VIEW FN
export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

export const NETWORK_TYPE = "localhost";

export const MAX_APPROVED = 100000000000;

export interface ContractSetup {
    address: string;
    abi: any[];
}

export const USDT_CONTRACT: { [chainId: string]: ContractSetup } = {
    "localhost": {
        address: "0x959922bE3CAee4b8Cd9a407cc3ac1C251C2007B1",
        abi: erc20Abi.abi
    },
};


export const Lottery_CONTRACT: { [chainId: string]: ContractSetup } = {
    "localhost": {
        address: "0x3Aa5ebB10DC797CAC828524e59A333d0A371443c",
        abi: LotteryAbi.abi
    },
};