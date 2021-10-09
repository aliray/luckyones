import { Statistic } from 'antd';
import React from 'react';
import { useModel } from 'umi';
import RewardsTips from '../Tools/RewardsTips';
import styles from './index.less';

const NavNotice: React.FC = () => {

    const { endTime, roundId, currentRewards } = useModel("lottery", (ret => ({
        endTime: ret.currentLottery?.endTime,
        roundId: ret.currentLottery?.id,
        currentRewards: ret.currentRewards
    })));

    return (
        <div className={styles.nav_content}>
            <Statistic.Countdown
                value={Number(endTime)}
                format="HH:mm:ss"
                valueStyle={{ color: "#280D5F" }}
            />
            <span style={{ fontSize: "large" }}>
                &nbsp;总奖金池
            </span>
            <RewardsTips value={currentRewards} unit="$"/>
        </div>
    );
}

export default NavNotice;