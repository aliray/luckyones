/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from 'react';
import { getGraphLotteries } from '@/services/api';
import _ from 'lodash';
import { useModel } from 'umi'
import { callViewOfLotteryContract, callViewOfUsdtContract } from '@/utils/web3Utils'
import { NETWORK_TYPE, USDT_CONTRACT, Lottery_CONTRACT, MAX_APPROVED } from '@/utils/constants'
import { generateLottoNumbers, gweiToDecimalNumber, numberToGweiBN, gweiIsltzero, intervalTimeout } from '@/utils/tools'

export default function lottery() {

    // lotteries info
    const [lotteries, setLotteries] = useState([]);
    const [currentLottery, setCurrentLottery] = useState(null);
    const [curRenderLottery, setCurRenderLottery] = useState(null);
    const [currentLotteryId, setCurrentLotteryId] = useState("0");
    const [currentRewards, setCurrentRewards] = useState(0);
    const [currentRenderRewards, setCurrentRenderRewards] = useState(0);
    const [loadingLottery, setLoadingLottery] = useState(false);

    const queryCurrentLotteries = async () => {
        const tempLotteries = await getGraphLotteries() || [];
        setLotteries(tempLotteries);
        setCurrentLottery(tempLotteries[0]);
        setCurrentLotteryId(tempLotteries[0]?.id);
        setCurrentRewards(Number(tempLotteries[0]?.totalTickets || 0) * Number(tempLotteries[0]?.ticketPrice || 0))
        return tempLotteries;
    }

    const queryLotteries = async () => {
        const tempLotteries = await queryCurrentLotteries();
        setCurRenderLottery(tempLotteries[0]);
        setCurrentRenderRewards(Number(tempLotteries[0]?.totalTickets || 0) * Number(tempLotteries[0]?.ticketPrice || 0))
    }

    const nextLottery = async () => {
        const curId = curRenderLottery?.id;
        lotteries.map((v, i) => {
            if (v.id === String(parseInt(curId, 10) + 1)) {
                setCurRenderLottery(lotteries[i]);
                setCurrentRenderRewards(Number(lotteries[i]?.totalTickets || 0) * Number(lotteries[i]?.ticketPrice || 0))
            }
            return null;
        });
    }

    const lastLottery = async () => {
        const curId = curRenderLottery?.id;
        lotteries.map((v, i) => {
            if (v.id === String(parseInt(curId, 10) - 1)) {
                setCurRenderLottery(lotteries[i]);
                setCurrentRenderRewards(Number(lotteries[i]?.totalTickets || 0) * Number(lotteries[i]?.ticketPrice || 0))
            }
            return null;
        });
    }

    const backToCurLottery = async () => {
        lotteries.map((v, i) => {
            if (v.id === String(currentLottery.id)) {
                setCurRenderLottery(lotteries[i]);
                setCurrentRenderRewards(Number(lotteries[i]?.totalTickets || 0) * Number(lotteries[i]?.ticketPrice || 0))
            }
            return null;
        });
    }

    // fetch lotterys  onces
    useEffect(() => {
        setLoadingLottery(true);
        queryLotteries();
        setLoadingLottery(false);
        const interval = setInterval(async () => {
            queryCurrentLotteries();
        }, 10000)
        return () => clearInterval(interval)
    }, []);


    // lottery contract info
    const { address, web3 } = useModel("web3Model", (ret) => ({
        address: ret.status?.address,
        web3: ret.status?.web3,
    }))

    // const [contractInfo, setContractInfo] = useState({})
    const [balanceOfUsdt, setBalanceOfUsdt] = useState("")
    const [maxTickets, setMaxTickets] = useState(0)
    const [symbol, setSymbol] = useState("")
    const [maxRange, setMaxRange] = useState(0)
    const [allowance, setAllowance] = useState(0)
    const [lottoSize, setLottoSize] = useState(0)

    const queryContractInfo = async () => {
        if (address && web3) {
            const _usdtBalanceOf = await callViewOfUsdtContract("balanceOf", NETWORK_TYPE, web3, address)
            const _symbol = await callViewOfUsdtContract("symbol", NETWORK_TYPE, web3)
            const _maxTickets = await callViewOfLotteryContract("maxNumberTicketsPerBatch", NETWORK_TYPE, web3)
            const _maxRange = await callViewOfLotteryContract("maxValidRange", NETWORK_TYPE, web3)
            const _lottoSize = await callViewOfLotteryContract("sizeOfLotteryNubers", NETWORK_TYPE, web3)
            const _allowance = await
                callViewOfUsdtContract(
                    "allowance",
                    NETWORK_TYPE,
                    web3, address,
                    Lottery_CONTRACT[NETWORK_TYPE].address
                )
            setBalanceOfUsdt(gweiToDecimalNumber(_usdtBalanceOf || "0"))
            setSymbol(String(_symbol || ""))
            setMaxTickets(Number(Number(_maxTickets).toFixed(0)))
            setMaxRange(Number(_maxRange))
            setLottoSize(Number(_lottoSize))
            setAllowance(Number(gweiToDecimalNumber(_allowance || "0")))
        }
    }

    useEffect(() => {
        queryContractInfo()
    }, [address])

    return {
        loadingLottery,
        currentLotteryId,
        currentLottery,
        curRenderLottery,
        lotteries,
        currentRewards,
        currentRenderRewards,
        balanceOfUsdt, maxTickets, symbol, maxRange, allowance, lottoSize,
        queryLotteries,
        setLoadingLottery,
        nextLottery,
        lastLottery,
        backToCurLottery
    }

}