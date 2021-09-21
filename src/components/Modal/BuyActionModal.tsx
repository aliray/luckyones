/* eslint-disable @typescript-eslint/no-unused-vars */
import { NETWORK_TYPE, USDT_CONTRACT, Lottery_CONTRACT, MAX_APPROVED } from '@/utils/constants'
import { generateLottoNumbers, gweiToDecimalNumber, numberToGweiBN, gweiIsltzero, intervalTimeout } from '@/utils/tools'
import { buyLottTickets, callViewOfLotteryContract, callViewOfUsdtContract, callApprove } from '@/utils/web3Utils'
import { Button, InputNumber, Modal, Typography, Badge } from 'antd'
import React, { useEffect, useState } from 'react'
import { useIntl, useModel } from 'umi'
import { MoneyTipsNormal } from '../MoneyTips'
import { NoticeError, NoticeSuccess } from '../Notice'
import styles from './index.less'
import TicketsCount from '../TicketsCount'
import Web3 from 'web3'

const BuyActionModal: React.FC<{ visible, cancel }> = ({ visible, cancel, ...props }) => {
    const intl = useIntl()

    const { address, web3, openWeb3Modal } = useModel("web3Model", (ret) => ({
        address: ret.status?.address,
        web3: ret.status?.web3,
        openWeb3Modal: ret.openWeb3Modal
    }))
    const { currentLottery, currentLotteryId } = useModel("lottery")

    const [balanceOfUsdt, setBalanceOfUsdt] = useState("")
    const [tickets, setTickets] = useState(0)
    const [maxTickets, setMaxTickets] = useState(0)
    const [cost, setCost] = useState(0)
    const [symbol, setSymbol] = useState("")
    const [maxRange, setMaxRange] = useState(0)
    const [lottoSize, setLottoSize] = useState(0)
    const [allowance, setAllowance] = useState(0)
    const [approved, setApproved] = useState(false)
    const [payments, setPayments] = useState(false)
    const [approving, setApproving] = useState(false)

    // const [, setBalanceOfUsdt] = useState(0)
    const paysucccess = async () => {
        NoticeSuccess("操作成功.")
        setPayments(false)
        setApproving(false)
        setTickets(null)
        setCost(0)
    }

    const payerror = async () => {
        NoticeError("操作失败.")
        setPayments(false)
        setApproving(false)

    }

    const payTickets = async () => {
        try {
            if (address && web3) {
                if (tickets > 0 && tickets <= maxTickets && cost <= Number(balanceOfUsdt)) {
                    setPayments(true)
                    const numbers = generateLottoNumbers({
                        numberOfTickets: tickets,
                        lottoSize,
                        maxRange
                    })
                    const tx = await buyLottTickets(
                        address,
                        currentLotteryId,
                        tickets,
                        numbers,
                        NETWORK_TYPE,
                        web3,
                        paysucccess,
                        payerror
                    )
                    if (tx) {
                        const receipt = await intervalTimeout(
                            async () => {
                                return await web3.eth.getTransactionReceipt(String(tx))
                            }
                        )
                        if (receipt?.status) {
                            paysucccess()
                            return
                        }
                        payerror()
                    }
                }
            }
        } catch (error) {
            console.error(error)
            payerror()
        }

    }

    const approveContract = async () => {
        try {
            if (address && web3) {
                setApproving(true)
                const tx = await callApprove(
                    address,
                    numberToGweiBN(cost), // BN 不能使用 number ,number范围太小.
                    NETWORK_TYPE,
                    web3,
                    // Number(nonce),
                    paysucccess,
                    payerror
                )

                if (tx) {
                    const receipt = await intervalTimeout(
                        async () => {
                            return await web3.eth.getTransactionReceipt(String(tx))
                        }
                    )
                    if (receipt?.status) {
                        paysucccess()
                        return
                    }
                    payerror()
                }
            }
        } catch (error) {
            console.error(error)
            payerror()
        }
    }

    const getNonce = async () => {
        try {
            if (address && web3) {
                setApproving(true)
                const tx = await web3.eth.getTransactionCount(
                    address
                )
                NoticeError(tx)
                setApproving(false)
            }
        } catch (error) {
            console.error(error)
            NoticeError(error.message)
            setApproving(false)
        }
    }

    const queryBalanceofUsdt = async () => {
        if (address && web3) {
            const gwei = await callViewOfUsdtContract("balanceOf", NETWORK_TYPE, web3, address)
            setBalanceOfUsdt(gweiToDecimalNumber(gwei || "0"))
        }
    }

    const querySymbol = async () => {
        if (web3) {
            const result = await callViewOfUsdtContract("symbol", NETWORK_TYPE, web3)
            setSymbol(String(result || ""))
        }
    }

    const queryMaxTickets = async () => {
        if (web3) {
            const result = await callViewOfLotteryContract("maxNumberTicketsPerBatch", NETWORK_TYPE, web3)
            setMaxTickets(Number(Number(result).toFixed(0)))
        }
    }

    const queryMaxrange = async () => {
        if (web3) {
            const result = await callViewOfLotteryContract("maxValidRange", NETWORK_TYPE, web3)
            setMaxRange(Number(result))
        }
    }

    const querySizeOfLotteryNubers = async () => {
        if (web3) {
            const result = await callViewOfLotteryContract("sizeOfLotteryNubers", NETWORK_TYPE, web3)
            setLottoSize(Number(result))
        }
    }

    const queryAllowance = async () => {
        if (web3) {
            const gwei = await
                callViewOfUsdtContract(
                    "allowance",
                    NETWORK_TYPE,
                    web3, address,
                    Lottery_CONTRACT[NETWORK_TYPE].address
                )
            setAllowance(Number(gweiToDecimalNumber(gwei || "0")))
            setApproved(gweiIsltzero(gwei || "0"))
        }
    }

    const inputOnChange = async (e) => {
        setTickets(Number(e || 0))
        setCost(Number(currentLottery.ticketPrice) * Number(e || 0))
    }

    useEffect(() => {
        queryMaxTickets()
        querySymbol()
        queryMaxrange()
        querySizeOfLotteryNubers()
        queryAllowance()
        queryBalanceofUsdt()
    }, [tickets, address])


    useEffect(() => {
        setTickets(0)
        setCost(0)
    }, [visible])

    return (
        <Modal
            transitionName=""
            visible={visible}
            footer={null}
            width={400}
            title="购买彩票"
            style={{ top: "200px" }}
            onCancel={() => cancel(false)}>
            <div className={styles.input_modal}>
                <InputNumber
                    bordered={false}
                    min={0}
                    precision={0}
                    max={maxTickets}
                    // defaultValue={1}
                    // controls={false}
                    style={{ fontSize: "30px", color: "#280D5F", marginRight: "auto", width: "50%" }}
                    onChange={inputOnChange}
                    value={tickets}
                    size="large"
                    placeholder="0"
                    maxLength={7}
                />
                <div className={styles.modal_row}>
                    <MoneyTipsNormal money={balanceOfUsdt} unit={`余额 ${symbol}`} />
                    <span style={{ marginLeft: "auto" }}>
                        <MoneyTipsNormal money={Number(cost) || 0} unit={`费用 ${symbol}`} />
                    </span>
                </div>
            </div>
            <div className={styles.modal_row}>
                <TicketsCount count={tickets} />
                <div style={{ marginLeft: "auto" }}>
                    {
                        // eslint-disable-next-line no-nested-ternary
                        address ?
                            (
                                approved ?
                                    (
                                        <Button
                                            type="primary"
                                            size="large" shape="round"
                                            disabled={
                                                tickets <= 0 ||
                                                Number(balanceOfUsdt) <= 0 ||
                                                tickets > maxTickets ||
                                                (cost - Number(balanceOfUsdt)) > 0
                                            }
                                            loading={payments}
                                            block
                                            style={{
                                                height: "45px",
                                            }}
                                            onClick={payTickets}
                                        >
                                            {
                                                cost - Number(balanceOfUsdt) > 0 ? "余额不足" : "立即支付"
                                            }
                                        </Button>
                                    )
                                    :
                                    (
                                        <Button
                                            type="primary"
                                            size="large"
                                            shape="round"
                                            loading={approving}
                                            block
                                            style={{
                                                height: "45px",
                                            }}
                                            onClick={approveContract}
                                        >
                                            立即启用合约
                                        </Button>
                                    )

                            )
                            :
                            (

                                <Button
                                    block
                                    type="primary"
                                    size="large"
                                    shape="round"
                                    style={{ height: "45px" }}
                                    onClick={openWeb3Modal}
                                >
                                    连接钱包
                                </Button>

                            )

                    }
                </div>

            </div>
            <Typography.Text
                type="secondary"
                style={{ fontSize: "13px", textAlign: "left" }}>
                立即购买会选择随机号码，且您的彩票中无重复号码,最多购置
                <MoneyTipsNormal money={maxTickets} unit="张" />
                ,单价
                <MoneyTipsNormal money={currentLottery.ticketPrice || 0} unit={symbol} />.
            </Typography.Text>
        </Modal>
    )
}

export default BuyActionModal