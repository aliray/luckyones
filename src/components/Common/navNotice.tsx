import RewardsTips from '@/components/Tools/RewardsTips';
import { Statistic } from 'antd';
import React from 'react';
import { useModel } from 'umi';
import styles from './index.less';

const NavNotice: React.FC = () => {

    const { endTime, roundId, currentRewards } = useModel("lottery", (ret => ({
        endTime: ret.currentLottery?.endTime,
        roundId: ret.currentLottery?.id,
        currentRewards: ret.currentRewards
    })));

    return (
        <div className={styles.nav_content}>
            <span style={{ fontSize: "larger" }}>
                #{roundId}&nbsp;回合倒计时 &nbsp;
            </span>
            <Statistic.Countdown
                value={Number(endTime)}
                format="HH:mm:ss"
                valueStyle={{ color: "#C71FCD", fontSize: "xxx-large" }}
            />
            <span style={{ fontSize: "large" }}>
                &nbsp;奖金池&nbsp;
            </span>
            <RewardsTips size="xxx-large" value={currentRewards} />
        </div>
    );
}

export default NavNotice;