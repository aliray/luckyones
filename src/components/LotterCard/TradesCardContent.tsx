/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Empty, Skeleton, Space } from 'antd'
import React, { useState } from 'react'
import { useIntl, useModel } from 'umi'
import BuyActionModal from '../Modal/BuyActionModal'
import TicketsCount from '../TicketsCount'
import Lotteryballs from '../Tools/Lotteryballs'
import RewardsTips from '../Tools/RewardsTips'
import styles from './index.less'
import RewardsStatistic from './RewardsStatistic'

const TradesCardContent: React.FC = () => {
    const intl = useIntl()
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

    const { getUserTicketsCount } = useModel("users")
    const finalNumber = [9, 3, 4, 5, 6, 2]
    const noUsersdata = false

    return (
        <Skeleton active loading={loadingLottery} paragraph={{ rows: 2 }}>
            <div className={styles.content}>
                {
                    noUsersdata ? <>
                        {
                            finalNumber && finalNumber.length > 0 &&
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    width: "100%",
                                    marginBottom: "20px"
                                }}
                            >
                                <Space>
                                    <span className={styles.title}>中将号码</span>
                                    <div>
                                        {
                                            finalNumber.map((v, i) => {
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
                                fontSize: "20px"
                            }}
                        >
                            <Space size="large">
                                <span className={styles.title}>{null}</span>
                                <RewardsStatistic
                                    ruletips={`回合 # 4 奖池`}
                                    rewards={currentLotteryId === curRenderLottery.id ? currentRewards
                                        : Number(curRenderLottery?.totalTickets) * Number(curRenderLottery?.ticketPrice)}
                                    rp="已开奖"
                                />
                                <RewardsStatistic
                                    ruletips={`已购入`}
                                    rewards={210}
                                    rp={`${21}彩票`}
                                />
                                <RewardsStatistic
                                    ruletips={`已兑付`}
                                    rewards={210}
                                    rp={`${21}USDT`}
                                />
                                <RewardsStatistic
                                    ruletips={`中奖号码`}
                                    rewards={21}
                                    rp={`${21}张彩票`}
                                />
                                <RewardsStatistic
                                    ruletips={`命中数量`}
                                    rewards={21}
                                    rp={`个`}
                                />
                            </Space>
                        </div>
                    </> :
                        <Empty
                            style={{ margin: "auto" }}
                            description="暂无彩票数据"
                        />
                }
            </div>
        </Skeleton>
    )
}
export default TradesCardContent