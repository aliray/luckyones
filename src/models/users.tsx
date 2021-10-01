/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from 'react'
import { getGraphUserLotteries } from '@/services/api'
import _ from 'lodash'
import { useModel } from 'umi'
import { gweiToDecimalNumber, sleep } from '@/utils/tools'
import { UserLotteriesEntity } from '@/utils/types'

export default function users() {
    const { address, web3 } = useModel("web3Model", (ret) => ({
        address: ret.status?.address,
        web3: ret.status?.web3
    }))
    const [userLotteries, setUserLotteries] = useState<UserLotteriesEntity>(null)
    const [balanceOfEth, setBalance] = useState(0)
    const [loadingUsersLotteries, setLoadingUsersLotteries] = useState(false)
    const [rounds, setRounds] = useState([])
    const [curRoundId, setCurRoundId] = useState(-1)

    const queryUserBalance = async () => {
        const balance = await web3.eth.getBalance(address)
        setBalance(Number(gweiToDecimalNumber(balance)))
    }

    const queryUserLotteries = async () => {
        setLoadingUsersLotteries(true)
        const tempuserLotteries = await getGraphUserLotteries(address)
        const temprounds = tempuserLotteries.rounds

        setUserLotteries(tempuserLotteries)
        if (temprounds && temprounds.length > 0) {
            setRounds(temprounds)
            setCurRoundId(0)
        }
        setLoadingUsersLotteries(false)
    }

    const getUserTicketsCount = (lotteryId) => {
        let ticketsCount = 0
        if (userLotteries?.rounds) {
            ticketsCount = _.find(userLotteries?.rounds || [], { "lotteryId": lotteryId })?.totalTickets
        }
        return ticketsCount
    }

    const getUserTicketsNumber = (lotteryId): [number] => {
        let numbers: [number] = [null]
        if (userLotteries?.rounds) {
            numbers = _.find(userLotteries?.rounds || [], { "lotteryId": lotteryId })?.ticketsNumbers
        }
        return numbers
    }

    const pageTurn = (roundId) => {
        setCurRoundId(roundId)
    }

    // fetch users lotterys 
    useEffect(() => {
        if (address) {
            queryUserLotteries()
            queryUserBalance()
        }
    }, [address])

    return {
        loadingUsersLotteries, userLotteries, curRoundId, balanceOfEth, rounds, getUserTicketsCount, getUserTicketsNumber, pageTurn
    }
}