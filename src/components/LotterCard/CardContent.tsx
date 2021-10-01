/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Empty, Skeleton, Space } from 'antd'
import React, { useState } from 'react'
import { useIntl, useModel } from 'umi'
import BuyActionModal from '../Modal/BuyActionModal'
import TicketsCount from '../TicketsCount'
import Lotteryballs from '../Tools/Lotteryballs'
import RewardsTips from '../Tools/RewardsTips'
import styles from './index.less'

const LotteryCardContent: React.FC = () => {
    const intl = useIntl()
    const { status, openWeb3Modal } = useModel("web3Model")
    const {
        loadingLottery,
        curRenderLottery,
        currentLotteryId,
        currentRewards
    } = useModel("lottery", (ret) => ({
        loadingLottery: ret.loadingLottery,
        curRenderLottery: ret.curRenderLottery,
        currentRewards: ret.currentRewards,
        currentLotteryId: ret.currentLotteryId
    }))

    const { getUserTicketsCount, getUserTicketsNumber } = useModel(
        "users", (ret) => ({
            getUserTicketsCount: ret.getUserTicketsCount,
            getUserTicketsNumber: ret.getUserTicketsNumber
        }))

    const { purchaseVisible, openPurchaseModalUi, closePurchaseModalUi } = useModel("uimodel")

    return (
        <Skeleton active loading={loadingLottery} paragraph={{ rows: 2 }}>
            <div className={styles.content}>
                {
                    curRenderLottery && curRenderLottery.id ?
                        <>
                            {
                                curRenderLottery.finalNumber && curRenderLottery.finalNumber.length > 0 &&
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        width: "100%",
                                        // marginTop: "20px",
                                        marginBottom: "20px"
                                    }}
                                >
                                    <Space>
                                        <span className={styles.title}>中将号码</span>
                                        <div>
                                            {
                                                curRenderLottery.finalNumber.map((v, i) => {
                                                    return (
                                                        <Lotteryballs number={v} key={i} />
                                                    )
                                                })
                                            }

                                        </div>
                                    </Space>
                                </div>
                            }
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    width: "100%",
                                    fontSize: "20px",
                                    // marginBottom: "20px"
                                }}
                            >
                                <Space size="large">
                                    <span className={styles.title}>奖池</span>
                                    <RewardsTips
                                        size="50"
                                        value={
                                            currentLotteryId === curRenderLottery.id ? currentRewards
                                                : Number(curRenderLottery?.totalTickets) * Number(curRenderLottery?.ticketPrice)
                                        }
                                        unit="$"
                                    />
                                </Space>

                                <Space style={{ marginLeft: "auto" }}>
                                    <span className={styles.title}>您的彩票</span>
                                    <TicketsCount count={getUserTicketsCount(curRenderLottery?.id) || 0} numbers={getUserTicketsNumber(curRenderLottery?.id)} />
                                    {
                                        !(status?.provider?.isConnected() && status.address) ?
                                            <Button type="primary" size="large" shape="round" onClick={openWeb3Modal}>
                                                {intl.formatMessage({ id: 'pages.wallet.connectTips' })}
                                            </Button>
                                            :
                                            <Button type="primary" size="large" shape="round" onClick={openPurchaseModalUi}>
                                                {intl.formatMessage({ id: 'pages.wallet.buyButtonTips' })}
                                            </Button>
                                    }
                                </Space>
                            </div>
                        </> :
                        <Empty style={{ margin: "auto" }} description="" />
                }
            </div>
            {
                curRenderLottery && curRenderLottery.id ?
                    <BuyActionModal visible={purchaseVisible} cancel={closePurchaseModalUi} />
                    : null
            }
        </Skeleton>
    )
}
export default LotteryCardContent