import { Popover, Spin } from 'antd';
import React from 'react';
import { UnitipsNormal } from '../MoneyTips';
import Numbers from '../Numbers';
import styles from './index.less';

const TicketsCount: React.FC<{
    count: number, editable?: boolean,
    numbers: [number], loading?: boolean
}> = ({ count, numbers, editable = false, loading = false }) => {
    return (
        <Popover
            trigger="click"
            style={{ borderRadius: "20px" }}
            content={<Numbers editable={editable} ary={numbers} count={count} />}
        >
            <Spin spinning={loading}>
                <a className={styles.ticket_a}>
                    {count}张彩票
                </a>
            </Spin>
        </Popover>
    )
}

export default TicketsCount