/* eslint-disable @typescript-eslint/no-unused-vars */
import { NETWORK_TYPE } from '@/utils/constants'
import { generateLottoNumbers, intervalTimeout, numberToGweiBN } from '@/utils/tools'
import { buyLottTickets, callApprove } from '@/utils/web3Utils'
import { InputNumber, Modal } from 'antd'
import React, { useEffect } from 'react'
import { useIntl, useModel } from 'umi'
import EnableButton from '../Buttons/EnableButton'
import { MoneyTipsNormal } from '../MoneyTips'
import { NoticeError, NoticeSuccess } from '../Notice'
import SalesInfo from '../SalesInfo'
import TicketsCount from '../TicketsCount'
import styles from './index.less'
import { sleep } from '@/utils/tools'

const BuyActionModal: React.FC<{ visible, cancel }> = ({ visible, cancel, ...props }) => {
    const intl = useIntl()

    const { address, web3 } = useModel("web3Model", (ret) => ({
        address: ret.status?.address,
        web3: ret.status?.web3,
    }))
    const {
        currentLottery, currentLotteryId,
        balanceOfUsdt, maxTickets, symbol, maxRange, allowance, lottoSize
    } = useModel("lottery")

    const {
        tickets, cost, gnumbers, loadingNumbers,
        setTickets, setCost,
        setApproved, setApproving, setPayloading
    } = useModel("uimodel")
    // const [, setBalanceOfUsdt] = useState(0)
    const paysucccess = async () => {
        NoticeSuccess("操作成功.")
        setPayloading(false)
        setApproving(false)
        setTickets(0)
        setCost(0)
    }

    const payerror = async () => {
        NoticeError("操作失败.")
        setPayloading(false)
        setApproving(false)
    }

    const payTickets = async () => {
        try {
            if (address && web3) {
                if (tickets > 0 && tickets <= maxTickets && cost <= Number(balanceOfUsdt)) {
                    setPayloading(true)
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

    const inputOnChange = async (e) => {
        const value = Number(e || 0)
        setCost(Number(currentLottery.ticketPrice) * value)
        setTickets(value)
    }

    useEffect(() => {
        setTickets(0)
        setCost(0)
        setApproved(Number(allowance || 0) > 0)
    }, [visible, address, setTickets, setCost, setApproved, allowance])


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
                    max={100}
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
                <TicketsCount count={tickets} editable={true} numbers={gnumbers} loading={loadingNumbers} />
                <EnableButton buyfn={payTickets} approvefn={approveContract} />
            </div>
            <SalesInfo maxTickets symbol ticketPrice={currentLottery.ticketPrice} />
        </Modal>
    )
}

export default BuyActionModal