import { Divider, InputNumber, List, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { HiOutlineTicket } from 'react-icons/hi';
import TicketsNumbersInput from '../NumberInput/TicketsNumbersInput';

const Numbers: React.FC<{ count?: number, editable: boolean, ary?: any }> = ({
    count = 2,
    editable,
    ary = [
        1, 3, 4, 5,
        1, 3, 4, 5
    ],
    ...props
}) => {

    // const { lottoSize } = //useModel("lottery", (ret => ({ lottoSize: ret.lottoSize })))
    // count = 6
    const lottoSize = 4
    const maxRange = 20
    const [numbersArys, setNumersArys] = useState([])

    useEffect(
        () => {
            if ((lottoSize * count) === ary.length) {
                const tempArys = []
                // eslint-disable-next-line no-plusplus
                for (let index = 0; index < count; index++) {
                    tempArys.push(ary.slice(index * lottoSize, (index + 1) * lottoSize))
                }
                setNumersArys(tempArys)
            }
        }, [])

    return (
        (lottoSize * count) !== ary.length
            ? <span>数据错误</span>
            :
            <List
                dataSource={numbersArys}
                pagination={{
                    pageSize: 4,
                    simple: true
                }}
                // size="large"
                // split
                renderItem={
                    (item, i) => (
                        <Space
                            align="center"
                            // wrap
                            split="-"
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                padding: "8px",
                                marginTop: "10px"
                            }}>
                            {
                                item.map((n) => {
                                    return (
                                        <TicketsNumbersInput maxRange={maxRange} value={n} editable={editable} />
                                    )
                                })
                            }
                        </Space>
                    )
                }
            />
    )
}

export default Numbers