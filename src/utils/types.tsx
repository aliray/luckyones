import Web3 from "web3";
// import { provider } from 'web3-core';

export enum LotteryStatus {
    PENDING = 'pending',
    OPEN = 'open',
    CLOSE = 'close',
    CLAIMABLE = 'claimable',
}

export interface LotteryRoundGraphEntity {
    id: string
    totalUsers: string
    totalTickets: string
    winningTickets: string
    status: LotteryStatus
    finalNumber: string
    startTime: string
    endTime: string
    ticketPrice: string,
    prizeDistribution: number[]
}

export interface STATUS {
    provider: any,
    address: string,
    connected: boolean,
    web3: Web3,
    networkId: string,
    chainId: number
}

export interface UserLotteriesEntity {
    id: string,
    address: string,
    rounds: any[],
    totalRounds: string,
    totalTickets: string,
    totalUsdtCosts: string,
}

export interface LotteryPageInfo {



}