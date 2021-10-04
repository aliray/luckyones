/* eslint-disable react-hooks/rules-of-hooks */
import { generateLottoNumbers, sleep } from '@/utils/tools';
import { random } from 'lodash';
import { useState, useEffect } from 'react';
import { useIntl, useModel } from 'umi'

interface PurchaseModalUi {
    purchaseVisible: boolean,
    tickets: number,
    cost: number,
    approved: boolean,
    approving: boolean,
    payloading: boolean
}

interface TicketsUi {
    visible: boolean
}

export enum NormalUiStatus {
    OPEN = 'open',
    CLOSE = 'close',
    LOADING = 'loading'
}

export default function uimodel() {

    const { maxRange, lottoSize } = useModel("lottery")

    /**
     * tickets 数量,号码等数据展示
     */
    const [ticketsUi, setTicketsUi] = useState<TicketsUi>({
        visible: false
    })


    const openTicketsUi = () => {
        setTicketsUi({ ...ticketsUi, visible: true })
    }

    const closeTicketsUi = () => {
        setTicketsUi({ ...ticketsUi, visible: false })
    }

    /**
     * buy tickets modal ui 
     */
    const [purchaseVisible, setVisible] = useState(false)
    const [tickets, setTickets] = useState(0)
    const [cost, setCost] = useState(0)
    const [approved, setApproved] = useState(false)
    const [approving, setApproving] = useState(false)
    const [payloading, setPayloading] = useState(false)

    const openPurchaseModalUi = () => {
        setVisible(true)
    }

    const closePurchaseModalUi = () => {
        setVisible(false)
    }


    // 号码生成
    const [loadingNumbers, setLoadingNumbers] = useState(false)
    const [gnumbers, setNnumbers] = useState<[number]>([null])
    const [refreshNumbers, setRefreshNumbers] = useState(false)

    const createRandomNumbers = async () => {
        setLoadingNumbers(true)
        await sleep(random(1000))
        const tgnumbers = generateLottoNumbers({
            numberOfTickets: tickets,
            "lottoSize": lottoSize || 6,
            "maxRange": maxRange || 10
        })
        setNnumbers(tgnumbers)
        setLoadingNumbers(false)
    }

    useEffect(
        () => {
            createRandomNumbers()
        }, [tickets]
    )

    /**
     * theme dark light:default
     */
    const [theme, setTheme] = useState("")
    const toogleTheme = (type: string) => {
        setTheme(type)
    }

    return {
        theme, toogleTheme,
        ticketsUi, openTicketsUi, closeTicketsUi,
        purchaseVisible, tickets, cost, approved, approving, payloading,
        loadingNumbers, gnumbers, refreshNumbers, setNnumbers, setRefreshNumbers,
        openPurchaseModalUi, closePurchaseModalUi, setTickets, setCost, setApproved, setApproving, setPayloading
    }
}