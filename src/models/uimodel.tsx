/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react';


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

    return {
        ticketsUi, openTicketsUi, closeTicketsUi,
        purchaseVisible, tickets, cost, approved, approving, payloading,
        openPurchaseModalUi, closePurchaseModalUi, setTickets, setCost, setApproved, setApproving, setPayloading
    }
}