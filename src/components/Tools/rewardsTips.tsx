/* eslint-disable @typescript-eslint/no-unused-vars */
import styles from './tools.less';
import React, { useState, useEffect } from 'react';
import { useSpring, animated, config } from 'react-spring'

const RewardsTips: React.FC<{ size?: string, value?: number, unit?: string }> = ({ size, value, unit }) => {

    const [fromTips, setFromTips] = useState(0);
    const [toTips, setToTips] = useState(0);

    const { tips } = useSpring({
        from: { tips: fromTips || 0 },
        to: { tips: toTips || 0 },
    })

    useEffect(() => {
        setFromTips(toTips);
        setToTips(value);
    }, [value]);

    return (
        <>
            <animated.span className={styles.rewards} style={{ fontSize: Number(size) }} >
                {tips.to(n => n.toFixed(0))}
            </animated.span>
            {unit && <span style={{ fontSize: Number(size) / 3 }}>&nbsp;$</span>}
        </>
    );
};
export default RewardsTips;