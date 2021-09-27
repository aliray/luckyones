/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from 'react'
import { getGraphUserLotteries } from '@/services/api'
import _ from 'lodash'
import { useModel } from 'umi'
import { gweiToDecimalNumber } from '@/utils/tools'

export default function users() {
    const { address, web3 } = useModel("web3Model", (ret) => ({
        address: ret.status?.address,
        web3: ret.status?.web3
    }))
    const [userLotteries, setUserLotteries] = useState({})
    const [balanceOfEth, setBalance] = useState(0)


    const queryUserLotteries = async () => {
        const tempuserLotteries = await getGraphUserLotteries(address) || {}
        setUserLotteries(tempuserLotteries)
    }

    const queryUserBalance = async () => {
        const balance = await web3.eth.getBalance(address)
        setBalance(Number(gweiToDecimalNumber(balance)))
    }

    const getUserTicketsCount = (lotteryId) => {
        let ticketsCount = 0
        if (userLotteries?.rounds) {
            ticketsCount = _.find(userLotteries?.rounds || [], { "lotteryId": lotteryId })?.totalTickets
        }
        return ticketsCount
    }

    // fetch users lotterys 
    useEffect(() => {
        if (address) {
            queryUserLotteries()
            queryUserBalance()
        }
    }, [address])

    return {
        userLotteries, balanceOfEth, getUserTicketsCount
    }
}