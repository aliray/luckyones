/* eslint-disable @typescript-eslint/no-unused-vars */

import LotteryCard from '@/components/LotterCard';
import TradesCardContent from '@/components/LotterCard/TradesCardContent';
import RewardsRules from '@/components/LotterCard/RewardsRule';
import { RollbackOutlined, VerticalLeftOutlined, VerticalRightOutlined } from '@ant-design/icons';
import { Button, Empty, Space, Typography } from 'antd';
import moment from 'moment';
import React from 'react';
import { useIntl, useModel } from 'umi';

const Trades: React.FC = () => {
    const intl = useIntl();
    const {
        loadingLottery,
        currentLotteryId,
        curRenderLottery,
        nextLottery, lastLottery, backToCurLottery
    } = useModel("lottery", (ret) => ({
        nextLottery: ret.nextLottery,
        lastLottery: ret.lastLottery,
        backToCurLottery: ret.backToCurLottery,
        loadingLottery: ret.loadingLottery,
        currentLotteryId: ret.currentLotteryId,
        curRenderLottery: ret.curRenderLottery,
    }))

    return (
        <LotteryCard
            loadingLottery={loadingLottery}
            title={`总计参与${0}回合`}
            tips={`${123}张彩票 ${0}$奖金`}
            extral={
                <Space>
                    <Button type="link" disabled={curRenderLottery?.id <= 1} icon={<VerticalRightOutlined />} onClick={lastLottery} />
                    <Button type="link" disabled={currentLotteryId === curRenderLottery?.id} icon={<VerticalLeftOutlined />} onClick={nextLottery} />
                    <Button type="link" disabled={currentLotteryId === curRenderLottery?.id} icon={<RollbackOutlined />} onClick={backToCurLottery} />
                </Space>
            }

            footer={
                <Typography.Text type="secondary" strong={false} style={{ fontSize: "13px", fontWeight: "lighter", textAlign: "center" }}>
                    {intl.formatMessage({ id: 'pages.lottery.TradesHis' })}
                </Typography.Text>
            }
            empty={
                curRenderLottery ? null :
                    <Empty
                        style={{ margin: "auto" }}
                        description="暂无彩票数据"
                    />
            }
            content={
                <TradesCardContent />
            }
        />
    );
};

export default Trades;