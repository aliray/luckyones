import { Divider, InputNumber, List, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import styles from './index.less'

const TicketsNumbersInput: React.FC<{ maxRange?: number, editable?: boolean, value: number }> = ({ maxRange = 3, editable = false, value, ...props }) => {
    return (
        <div className={`${styles.input_numbers_int} local_input_number`}>
            <InputNumber
                bordered={false}
                min={0}
                precision={0}
                max={maxRange}
                maxLength={String(maxRange).length}
                style={{ color: "#280D5F", width: '50px' }}
                value={value}
                disabled={!editable}
            />
        </div>

    )
}

export default TicketsNumbersInput