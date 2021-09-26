/* eslint-disable no-async-promise-executor */
// import { NoticeError } from "@/components/Notice"
import { USDT_CONTRACT, ZERO_ADDRESS, Lottery_CONTRACT } from "./constants"

export function getUsdtContract(chainId: string, web3: any) {
    const dai = new web3.eth.Contract(
        USDT_CONTRACT[chainId].abi,
        USDT_CONTRACT[chainId].address
    )
    return dai
}

export function getLotteryContract(chainId: string, web3: any) {
    const lottery = new web3.eth.Contract(
        Lottery_CONTRACT[chainId].abi,
        Lottery_CONTRACT[chainId].address
    )
    return lottery
}

export async function callViewOfUsdtContract(
    method: string,
    chainId: string,
    web3: any,
    ...params: any[]
) {
    const usdt = getUsdtContract(chainId, web3);
    let result = null;
    try {
        result = params ?
            await usdt
                .methods[method](...params)
                .call({ from: ZERO_ADDRESS }) :
            await usdt
                .methods[method]()
                .call({ from: ZERO_ADDRESS })
    } catch (error) {
        console.error(error);
    }
    return result;
}

export async function callViewOfLotteryContract(
    method: string,
    chainId: string,
    web3: any,
    ...params: any[]
) {
    const lottery = getLotteryContract(chainId, web3);
    let result = null;
    try {
        result = params ?
            await lottery
                .methods[method](...params)
                .call({ from: ZERO_ADDRESS }) :
            await lottery
                .methods[method]()
                .call({ from: ZERO_ADDRESS })
    } catch (error) {
        console.error(error);
    }
    return result;
}

export function callApprove(
    address: string,
    cost: number,
    chainId: string,
    web3: any,
    // nonce: number,
    callback?: Function,
    errorcallback?: Function
) {
    return new Promise(
        async (resolve, reject) => {
            const usdt = getUsdtContract(chainId, web3)
            await usdt.methods
                .approve(Lottery_CONTRACT[chainId].address, cost)
                .send(
                    {
                        from: address,
                        // nonce
                    },
                    (err: any, data: any) => {
                        if (err) {
                            reject(err)
                        } else {
                            resolve(data)
                        }
                    }
                )
                .on('error', (error, receipt) => {
                    console.error(error, receipt)
                    errorcallback()
                })
        }
    )
}

export function buyLottTickets(
    address: string,
    lotteryId: string,
    tickets: number,
    ticketNumbers: number[],
    chainId: string,
    web3: any,
    callback: Function,
    errorcallback: Function
) {
    return new Promise(async (resolve, reject) => {
        const lottery = getLotteryContract(chainId, web3)
        try {
            await lottery.methods
                .buyLottTickets(lotteryId, tickets, ticketNumbers)
                .send(
                    { from: address },
                    (err: any, data: any) => {
                        if (err) {
                            reject(err)
                        } else {
                            resolve(data)
                        }
                    }
                )
                .on('error', (error, receipt) => {
                    // errorcallback();
                    console.error(error, receipt);
                })
        } catch (error) {
            reject(error)
        }
    })
}

