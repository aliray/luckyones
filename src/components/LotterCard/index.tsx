/* eslint-disable @typescript-eslint/no-unused-vars */
import { Empty } from 'antd';
import React from 'react';
import { useIntl, useModel } from 'umi';
import LotteryCardContent from './CardContent';
import LotteryCardFooter from './CardFooter';
import LotteryCardHeader from './CardHeader';
import styles from './index.less';

const LotteryCard: React.FC<{
    // header
    title?: any,
    tips?: any,
    extral?: React.ReactNode,
    // footer
    footer?: React.ReactNode,
    // content
    content?: React.ReactNode,
    loadingLottery?: boolean,
    empty?: React.ReactNode
}> = ({ title, tips, extral, footer, content, loadingLottery, empty, ...props }) => {



    return (
        <div className={styles.lottery_container}>
            {
                empty
                ||
                <>
                    <LotteryCardHeader loadingLottery={loadingLottery} title={title} tips={tips} extral={extral} />
                    {content}
                    <LotteryCardFooter footer={footer} />
                </>
            }
        </div >
    );
};
export default LotteryCard;