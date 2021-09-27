import { InputNumber } from 'antd'
import React from 'react'
import { useModel } from 'umi'
import styles from './index.less'

const TicketsNumbersInput: React.FC<{ maxRange?: number, editable?: boolean, value: number, index: number }> =
    ({ maxRange = 3, editable = false, value, index }) => {

        const { gnumbers, setNnumbers, refreshNumbers, setRefreshNumbers } = useModel("uimodel")
        const onChange = async (e) => {
            gnumbers[index] = Number(e || 0)
            setNnumbers(gnumbers)
            setRefreshNumbers(!refreshNumbers)
        }

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
                    onChange={onChange}
                />
            </div>

        )
    }

export default TicketsNumbersInput