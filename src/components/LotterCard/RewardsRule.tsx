/* eslint-disable @typescript-eslint/no-unused-vars */
import { Col, Row, Skeleton } from 'antd';
import React from 'react';
import { useModel } from 'umi';
import RewardsStatistic from './RewardsStatistic';

const RewardsRules: React.FC = (props) => {

    const {
        loadingLottery,
        prizeDistribution,
        currentRewards,
        currentRenderRewards,
        currentLotteryId,
        curRenderLotteryId,
        totalUsers,
        totalTickets
    } = useModel("lottery", (ret => ({
        loadingLottery: ret.loadingLottery,
        prizeDistribution: ret.curRenderLottery?.prizeDistribution,
        currentRewards: ret.currentRewards,
        currentRenderRewards: ret.currentRenderRewards,
        currentLotteryId: ret.currentLotteryId,
        curRenderLotteryId: ret.curRenderLottery?.id,
        totalUsers: ret.curRenderLottery?.totalUsers,
        totalTickets: ret.curRenderLottery?.totalTickets
    })));
    
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "center",
                width: "100%",
                marginTop: "10px"
            }}
        >
            <Skeleton active loading={loadingLottery} paragraph={{ rows: 2 }} title={false}>
                <Row gutter={[0, 16]} style={{ width: "100%" }}>
                    {
                        prizeDistribution?.map(
                            (v, i) =>
                                <Col span={4} key={i}>
                                    <RewardsStatistic
                                        ruletips={`命中前${i + 1}位`}
                                        rewards={
                                            (curRenderLotteryId === currentLotteryId ? currentRewards : currentRenderRewards) * v / 100
                                        }
                                        rp={`占${v}%`}
                                    />
                                </Col>
                        )
                    }
                    <Col span={4} >
                        <RewardsStatistic
                            ruletips={`参与人数`}
                            rewards={totalUsers}
                            rp={`实时数据`}
                        />
                    </Col>
                    <Col span={4} >
                        <RewardsStatistic
                            ruletips={`已售出`}
                            rewards={totalTickets}
                            rp={`张彩票`}
                        />
                    </Col>
                </Row>
            </Skeleton>
        </div>
    );
};
export default RewardsRules;