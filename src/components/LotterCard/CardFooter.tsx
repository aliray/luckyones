/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import styles from './index.less'

const LotteryCardFooter: React.FC<{ footer: React.ReactNode }> = ({ footer, ...props }) => {
    return (
        <div className={styles.footer}>
            {footer}
        </div>
    )
}
export default LotteryCardFooter