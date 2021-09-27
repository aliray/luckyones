/* eslint-disable @typescript-eslint/no-unused-vars */

import LotteryCard from '@/components/LotterCard';
import LotteryCardContent from '@/components/LotterCard/CardContent';
import RewardsRules from '@/components/LotterCard/RewardsRule';
import { RollbackOutlined, VerticalLeftOutlined, VerticalRightOutlined } from '@ant-design/icons';
import { Button, Empty, Space, Typography } from 'antd';
import moment from 'moment';
import React from 'react';
import { useIntl, useModel } from 'umi';

const Lottery: React.FC = () => {
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
      title={curRenderLottery?.id === currentLotteryId ? `最新回合 #${curRenderLottery?.id}` : `回合 ${curRenderLottery?.id}`}
      tips={
        `
          ${moment(Number(curRenderLottery?.endTime)).isAfter(moment.now()) ? "等待开奖: " : "已结束于"}
          ${moment(Number(curRenderLottery?.endTime)).format("yy MMMM DD h:mm a")}
        `
      }
      extral={
        <Space>
          <Button type="link" disabled={curRenderLottery?.id <= 1} icon={<VerticalRightOutlined />} onClick={lastLottery} />
          <Button type="link" disabled={currentLotteryId === curRenderLottery?.id} icon={<VerticalLeftOutlined />} onClick={nextLottery} />
          <Button type="link" disabled={currentLotteryId === curRenderLottery?.id} icon={<RollbackOutlined />} onClick={backToCurLottery} />
        </Space>
      }

      footer={
        <>
          <Typography.Text type="secondary" strong={false} style={{ fontSize: "13px", fontWeight: "lighter", textAlign: "left" }}>
            {intl.formatMessage({ id: 'pages.lottery.ruleTips' })}
          </Typography.Text>
          <RewardsRules />
        </>
      }
      empty={
        curRenderLottery ? null :
          <Empty
            style={{ margin: "auto" }}
            description="暂无彩票数据,请等待开奖!"
          />
      }
      content={
        <LotteryCardContent />
      }
    />
  );
};

export default Lottery;