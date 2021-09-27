/* eslint-disable no-plusplus */
import { ethers } from "ethers"
import Web3 from "web3"

export function ellipseAddress(
    address: string = "",
    width: number = 10
): string {
    return `${address.slice(0, width)}...${address.slice(-width)}`
}

export async function sleep(ms: number) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('')
        }, ms)
    })
}

/**
 * 
 * @param fn 
 * @param ms 
 * @param timeout 
 * @returns 
 */
export async function intervalTimeout(fn, ms: number = 1000, timeout: number = 5000) {

    return new Promise((resolve) => {
        let to = null
        let receipt = null
        const interval = setInterval(
            async () => {
                if (!to) {
                    to = setTimeout(
                        () => {
                            clearInterval(interval)
                            clearTimeout(to)
                            resolve(receipt)
                        },
                        timeout
                    )
                }
                try {
                    receipt = await fn()
                } catch (error) {
                    clearInterval(interval)
                    if (to) clearTimeout(to)
                    resolve(receipt)
                    return
                }
                if (receipt?.status) {
                    clearInterval(interval)
                    if (to) clearTimeout(to)
                    resolve(receipt)
                }
            },
            ms
        )
    })
}

export function gweiDisplayString(
    gwei: any
): string {
    return ethers.utils.formatEther(
        ethers.BigNumber.from(gwei)
    )
}

export function bigNumberDisplayString(
    bign: ethers.BigNumber
): string {
    return ethers.utils.formatEther(bign)
}


export function gweiToDecimalNumber(
    gwei: any
): string {
    return Web3.utils.fromWei(gwei)
}

export function gweiIsltzero(
    gwei: any
): boolean {
    return Web3.utils.toBN(Web3.utils.fromWei(gwei)).cmpn(0) > 0
}

export function numberToGweiBN(
    value: number
): any {
    return Web3.utils.toWei(Web3.utils.toBN(value), 'ether')
}


export function generateLottoNumbers({
    numberOfTickets,
    lottoSize,
    maxRange
}): [number] {
    const numberOfNumbers: [number] = [null]
    let counterForNumbers = 0
    for (let i = 0; i < numberOfTickets; i++) {
        for (let j = 0; j < lottoSize; j++) {
            numberOfNumbers[counterForNumbers] = Math.floor(Math.random() * maxRange + 1)
            counterForNumbers += 1
        }
    }
    return numberOfNumbers
}

