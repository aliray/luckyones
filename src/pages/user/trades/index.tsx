/* eslint-disable @typescript-eslint/no-unused-vars */

import LotteryCard from '@/components/LotterCard'
import TradesCardContent from '@/components/LotterCard/TradesCardContent'
import { RollbackOutlined, VerticalLeftOutlined, VerticalRightOutlined } from '@ant-design/icons'
import { Button, Empty, Skeleton, Space, Typography } from 'antd'
import React from 'react'
import { useIntl, useModel } from 'umi'

const Trades: React.FC = () => {
    const intl = useIntl()
    const { loadingUsersLotteries, userLotteries, curRoundId, pageTurn, rounds } = useModel("users")

    return (
        <LotteryCard
            title={`参与了 ${userLotteries?.totalRounds || 0} 回合`}
            tips={`购买了${userLotteries?.totalTickets || 0}张彩票`}
            extral={
                rounds?.length > 0 ?
                    <Space>
                        <Button type="link" disabled={curRoundId >= (rounds.length - 1)}
                            icon={<VerticalRightOutlined />} onClick={
                                () => pageTurn(curRoundId + 1)
                            }
                        />
                        <Button type="link" disabled={curRoundId === 0}
                            icon={<VerticalLeftOutlined />} onClick={
                                () => pageTurn(curRoundId - 1)
                            }
                        />
                        <Button type="link" disabled={curRoundId === 0}
                            icon={<RollbackOutlined />} onClick={() => pageTurn(0)}
                        />
                    </Space> : null
            }
            footer={
                <Typography.Text type="secondary" strong={false} style={{ fontSize: "13px", fontWeight: "lighter", textAlign: "center" }}>
                    {intl.formatMessage({ id: 'pages.lottery.TradesHis' })}
                </Typography.Text>
            }
            empty={userLotteries ? null : <Empty style={{ margin: "auto" }} />}
            content={<TradesCardContent />}
        />
    )
}

export default Trades