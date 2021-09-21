/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from 'react';
import { getGraphLotteries } from '@/services/api';
import _ from 'lodash';
import { sleep } from '@/utils/tools';


export default function lottery() {

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



    return {
        loadingLottery,
        currentLotteryId,
        currentLottery,
        curRenderLottery,
        lotteries,
        currentRewards,
        currentRenderRewards,
        queryLotteries,
        setLoadingLottery,
        nextLottery,
        lastLottery,
        backToCurLottery
    }

}