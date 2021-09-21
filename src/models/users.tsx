/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from 'react'
import { getGraphUserLotteries } from '@/services/api'
import _ from 'lodash'
import { useModel } from 'umi'


export default function lottery() {
    const { address } = useModel("web3Model", (ret) => ({
        address: ret.status?.address,
    }))
    const [userLotteries, setUserLotteries] = useState({})


    const queryUserLotteries = async () => {
        const tempuserLotteries = await getGraphUserLotteries(address) || {}
        setUserLotteries(tempuserLotteries)
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
        queryUserLotteries()
        // const interval = setInterval(async () => {
        //     if (address) {
        //         queryUserLotteries()
        //     }
        // }, 10000)
        // return () => clearInterval(interval)
    }, [address])



    return {
        userLotteries, getUserTicketsCount
    }
}