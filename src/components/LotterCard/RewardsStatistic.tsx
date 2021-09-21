/* eslint-disable @typescript-eslint/no-unused-vars */
import { Typography, Statistic } from 'antd';
import React from 'react';
import styles from './index.less';
import { MoneyTipsNormal } from '../MoneyTips';

const RewardsStatistic: React.FC<{ ruletips: string, rewards: number, rp?: string }> = ({ ruletips, rewards, rp }) => {

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
            }}
        >
            <span className={styles.rewards_ruletips}>{ruletips}</span>
            <MoneyTipsNormal money={rewards} />
            <Typography.Text type="secondary"
                strong={false}
                style={{ fontSize: "13px", fontWeight: "lighter", textAlign: "left" }}>
                {rp}
            </Typography.Text>
        </div>
    );
};
export default RewardsStatistic;