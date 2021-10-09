/* eslint-disable @typescript-eslint/no-unused-vars */
import LotteryCard from '@/components/LotterCard'
import LotteryCardContent from '@/components/LotterCard/CardContent'
import RewardsRules from '@/components/LotterCard/RewardsRule'
import { timeFormat, timeToLotteryStatus } from '@/utils/tools'
import { RollbackOutlined, VerticalLeftOutlined, VerticalRightOutlined, CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons'
import { Button, Empty, Space, Typography } from 'antd'
import React, { useState } from 'react'
import { useIntl, useModel } from 'umi'

const Lottery: React.FC = () => {
  const intl = useIntl()
  const {
    loadingLottery,
    currentLotteryId,
    curRenderLottery,
    pageTurn
  } = useModel("lottery", (ret) => ({
    pageTurn: ret.pageTurn,
    loadingLottery: ret.loadingLottery,
    currentLotteryId: ret.currentLotteryId,
    curRenderLottery: ret.curRenderLottery,
  }))

  const [showDetail, setShowDetail] = useState(false)

  return (
    curRenderLottery && currentLotteryId ?
      <LotteryCard
        loadingLottery={loadingLottery}
        title={curRenderLottery?.id === currentLotteryId ? `最新回合 #${curRenderLottery?.id}` : `回合 ${curRenderLottery?.id}`}
        tips={`${timeToLotteryStatus(Number(curRenderLottery?.endTime))} ${timeFormat(Number(curRenderLottery?.endTime))}`}
        extral={
          <Space>
            <Button type="link" disabled={curRenderLottery?.id <= 1}
              icon={<VerticalRightOutlined />}
              onClick={() => { pageTurn(Number(curRenderLottery?.id) - 1) }}
            />
            <Button type="link" disabled={currentLotteryId === curRenderLottery?.id}
              icon={<VerticalLeftOutlined />}
              onClick={() => { pageTurn(Number(curRenderLottery?.id) + 1) }}
            />
            <Button type="link" disabled={currentLotteryId === curRenderLottery?.id}
              icon={<RollbackOutlined />}
              onClick={() => { pageTurn(Number(currentLotteryId)) }}
            />
          </Space>
        }
        footer={
          showDetail ?
            <>
              <Typography.Text type="secondary" strong={false} style={{ fontSize: "13px", fontWeight: "lighter", textAlign: "left" }}>
                {intl.formatMessage({ id: 'pages.lottery.ruleTips' })}
              </Typography.Text>
              <RewardsRules />
              <Typography.Text type="secondary" strong={false} style={{ fontSize: "13px", fontWeight: "lighter", textAlign: "center" }}>
                <a onClick={() => { setShowDetail(false) }}>隐藏&nbsp;<CaretUpOutlined /></a>
              </Typography.Text>
            </> :
            <Typography.Text type="secondary" strong={false} style={{ fontSize: "13px", fontWeight: "lighter", textAlign: "center" }}>
              <a onClick={() => { setShowDetail(true) }}>详情&nbsp;<CaretDownOutlined /></a>
            </Typography.Text>
        }
        empty={
          curRenderLottery ? null :
            <Empty
              style={{ margin: "auto" }}
              description=""
            />
        }
        content={
          <LotteryCardContent />
        }
      /> :
      <LotteryCard
        title={"最新回合还未开始!"}
        footer={
          <>
            <Typography.Text type="secondary" strong={false} style={{ fontSize: "13px", fontWeight: "lighter", textAlign: "center" }}>
              {intl.formatMessage({ id: 'pages.lottery.ruleTips' })}
            </Typography.Text>
          </>
        }
        empty={
          <Empty
            style={{ margin: "auto" }}
            description=""
          />
        }
        content={<LotteryCardContent />}
      />
  )
}

export default Lottery