/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import styles from './index.less';
import { Space, Button, Skeleton } from 'antd';
import { VerticalLeftOutlined, VerticalRightOutlined, RollbackOutlined } from '@ant-design/icons';
import { useModel, useIntl } from 'umi';
import moment from 'moment';

const LotteryCardHeader: React.FC = (props) => {
    const intl = useIntl()
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
        <div className={styles.header}>
            <Skeleton active loading={loadingLottery} paragraph={{ rows: 1 }}>
                <div >
                    <span className={styles.round_font}>
                        {
                            curRenderLottery?.id === currentLotteryId ? `最新回合 ${curRenderLottery?.id}` : `回合 ${curRenderLottery?.id}`
                        }
                    </span>
                    <br />
                    <span className={styles.round_time}>
                        {
                            moment(Number(curRenderLottery?.endTime)).isAfter(moment.now()) ? "等待开奖:" : "已结束"
                        }
                        &nbsp;
                        {
                            moment(Number(curRenderLottery?.endTime)).format("yy MMMM DD h:mm a")
                        }
                    </span>
                </div>

                <div style={{ marginLeft: "auto" }}>
                    <Space>
                        <Button type="link" disabled={curRenderLottery?.id <= 1} icon={<VerticalRightOutlined />} onClick={lastLottery} />
                        <Button type="link" disabled={currentLotteryId === curRenderLottery?.id} icon={<VerticalLeftOutlined />} onClick={nextLottery} />
                        <Button type="link" disabled={currentLotteryId === curRenderLottery?.id} icon={<RollbackOutlined />} onClick={backToCurLottery} />
                    </Space>
                </div>
            </Skeleton>
        </div>
    );
};
export default LotteryCardHeader;