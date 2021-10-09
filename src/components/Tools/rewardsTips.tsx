/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react'
import { animated, useSpring } from 'react-spring'
import styles from './tools.less'

const RewardsTips: React.FC<{ size?: string, value?: number, unit?: string }> = ({ size, value, unit }) => {

    const [fromTips, setFromTips] = useState(0)
    const [toTips, setToTips] = useState(0)

    const { tips } = useSpring({
        from: { tips: fromTips || 0 },
        to: { tips: toTips || 0 }
    })

    useEffect(() => {
        setFromTips(toTips)
        setToTips(value)
    }, [value])

    return (
        <div>
            <animated.span className={styles.rewards} style={{ fontSize: Number(size) }} >
                {tips.to(n => n.toFixed(0))}
            </animated.span>
            <span style={{ fontSize: Number(size) / 3 }}>&nbsp;{unit || "$"}</span>
        </div>
    )
}
export default RewardsTips