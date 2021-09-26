/* eslint-disable @typescript-eslint/no-unused-vars */
import { Skeleton } from 'antd'
import React from 'react'
import styles from './index.less'

const LotteryCardHeader: React.FC<{ title?: any, tips?: any, extral?: React.ReactNode, loadingLottery?: boolean }> =
    ({ title, tips, extral, loadingLottery, ...props }) => {
        return (
            <div className={styles.header}>
                <Skeleton active loading={loadingLottery} paragraph={{ rows: 1 }}>
                    <div>
                        <span className={styles.round_font}>
                            {title || "标题"}
                        </span>
                        <br />
                        <span className={styles.round_time}>
                            {tips}
                        </span>
                    </div>
                    <div style={{ marginLeft: "auto" }}>
                        {extral}
                    </div>
                </Skeleton>
            </div>
        )
    }
export default LotteryCardHeader