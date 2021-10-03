/* eslint-disable @typescript-eslint/no-unused-vars */
import { timeFormat, timeToLotteryStatus } from '@/utils/tools'
import { Empty, Skeleton, Space } from 'antd'
import React from 'react'
import { useIntl, useModel } from 'umi'
import TicketsCount from '../TicketsCount'
import Lotteryballs from '../Tools/Lotteryballs'
import styles from './index.less'
import RewardsStatistic from './RewardsStatistic'

const TradesCardContent: React.FC = () => {
    const intl = useIntl()
    const { loadingUsersLotteries, userLotteries, rounds, curRoundId } = useModel("users")
    return (
        <Skeleton active loading={loadingUsersLotteries} paragraph={{ rows: 2 }}>
            <div className={styles.content}>
                {
                    userLotteries && rounds.length > 0 ? <>
                        {
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    width: "100%",
                                    marginBottom: "20px"
                                }}
                            >
                                <Space>
                                    <div className={styles.title}>中将号码</div>
                                    <div>
                                        {
                                            rounds[curRoundId] && rounds[curRoundId].finalNumber.length > 0 ?
                                                rounds[curRoundId].finalNumber.map((v, i) => {
                                                    return (
                                                        <Lotteryballs number={v} key={i} />
                                                    )
                                                }) :
                                                ["等", "待", "开", "奖", "!", "!"].map((v, i) => {
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
                                alignItems: "end",
                                width: "100%",
                                fontSize: "20px"
                            }}
                        >
                            <Space size="large" >
                                <div className={styles.title}>{null}</div>
                                <RewardsStatistic
                                    ruletips={`回合${rounds[curRoundId]?.lotteryId}总奖池`}
                                    rewards={Number(rounds[curRoundId]?.roundTotalTickets || 0) * Number(rounds[curRoundId]?.ticketPrice || 0)}
                                    rp={timeToLotteryStatus(rounds[curRoundId]?.endTime)}
                                />
                                <RewardsStatistic
                                    ruletips={`参与人数`}
                                    rewards={rounds[curRoundId]?.totalUsers || 0}
                                    rp={`个`}
                                />
                                <RewardsStatistic
                                    ruletips={`获得奖金`}
                                    rewards={0}
                                    rp={`${21}USDT`}
                                />
                            </Space>
                            <Space style={{ marginLeft: "auto" }}>
                                <div className={styles.title}>您的彩票</div>
                                <TicketsCount count={rounds[curRoundId].totalTickets || 0} numbers={rounds[curRoundId].ticketsNumbers} />
                            </Space>
                        </div>
                    </> :
                        <Empty style={{ margin: "auto" }} />
                }
            </div>
        </Skeleton>
    )
}
export default TradesCardContent