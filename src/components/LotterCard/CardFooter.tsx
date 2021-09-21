/* eslint-disable @typescript-eslint/no-unused-vars */
import { Typography } from 'antd';
import React from 'react';
import { useIntl } from 'umi';
import styles from './index.less';
import RewardsRules from './RewardsRule';

const LotteryCardFooter: React.FC = (props) => {
    const intl = useIntl();
    return (
        <div className={styles.footer}>
            <Typography.Text type="secondary" strong={false} style={{ fontSize: "13px", fontWeight: "lighter", textAlign: "left" }}>
                {intl.formatMessage({ id: 'pages.lottery.ruleTips' })}
            </Typography.Text>
            <RewardsRules />
        </div>
    );
};
export default LotteryCardFooter;