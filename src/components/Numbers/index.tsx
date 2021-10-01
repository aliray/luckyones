import { List, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import TicketsNumbersInput from '../NumberInput/TicketsNumbersInput';
import { useModel } from 'umi'

const Numbers: React.FC<{ count?: number, editable: boolean, ary?: [number] }> = ({
    count,
    editable,
    ary,
}) => {

    const { refreshNumbers } = useModel("uimodel")
    const [numbersArys, setNumersArys] = useState([])

    const pageSize = 4
    const [currentPage, setCurrentPage] = useState(1)
    let { maxRange, lottoSize } = useModel("lottery")
    maxRange = maxRange || 10
    lottoSize = lottoSize || 6

    useEffect(
        () => {
            if ((lottoSize * count) === ary?.length) {
                const tempArys = []
                // eslint-disable-next-line no-plusplus
                for (let index = 0; index < count; index++) {
                    tempArys.push(ary.slice(index * lottoSize, (index + 1) * lottoSize))
                }
                setNumersArys(tempArys)
            }
        }, [refreshNumbers, count, ary])

    return (
        (lottoSize * count) !== ary?.length
            ? <span>{count}</span>
            :
            <List
                dataSource={numbersArys}
                pagination={
                    numbersArys.length > pageSize ?
                        {
                            pageSize, simple: true,
                            current: currentPage,
                            onChange: (p) => {
                                setCurrentPage(p)
                            }
                        } : null
                }
                renderItem={
                    (item, i) => (
                        <Space
                            key={i}
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
                                item.map((n, j) => {
                                    return (
                                        <TicketsNumbersInput
                                            index={
                                                j + i * lottoSize + ((currentPage - 1) * pageSize * lottoSize)
                                            }
                                            key={j + i}
                                            maxRange={maxRange}
                                            value={n}
                                            editable={editable}
                                        />
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