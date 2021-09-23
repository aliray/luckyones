/* eslint-disable @typescript-eslint/no-unused-vars */
import { Empty } from 'antd';
import React from 'react';
import { useIntl, useModel } from 'umi';
import LotteryCardContent from './CardContent';
import LotteryCardFooter from './CardFooter';
import LotteryCardHeader from './CardHeader';
import styles from './index.less';

const LotteryCard: React.FC = (props) => {

    const { curRenderLottery } = useModel("lottery", (ret) => ({
        curRenderLottery: ret.curRenderLottery,
    }));

    return (
        <div className={styles.lottery_container}>
            {
                curRenderLottery ?
                    <>
                        <LotteryCardHeader />
                        <LotteryCardContent />
                        <LotteryCardFooter />
                    </> :
                    <Empty style={{ margin: "auto" }} description="暂无彩票数据,请等待开奖!" />
            }
        </div >
    );
};
export default LotteryCard;