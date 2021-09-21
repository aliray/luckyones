/* eslint-disable @typescript-eslint/no-unused-vars */
import { Col, Row, Skeleton } from 'antd';
import React from 'react';
import RewardsStatistic from './RewardsStatistic';
import { Link, SelectLang, useIntl, useModel } from 'umi';

const RewardsRules: React.FC = (props) => {

    const {
        loadingLottery,
        prizeDistribution,
        currentRewards,
        currentRenderRewards,
        currentLotteryId,
        curRenderLotteryId
    } = useModel("lottery", (ret => ({
        loadingLottery: ret.loadingLottery,
        prizeDistribution: ret.curRenderLottery?.prizeDistribution,
        currentRewards: ret.currentRewards,
        currentRenderRewards: ret.currentRenderRewards,
        currentLotteryId: ret.currentLotteryId,
        curRenderLotteryId: ret.curRenderLottery?.id
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
                <Row gutter={[0, 16]} style={{ width: "100%" }} justify="start">
                    {
                        prizeDistribution?.map(
                            (v, i) =>
                                <Col span={6} key={i}>
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
                </Row>
            </Skeleton>
        </div>
    );
};
export default RewardsRules;