import { Divider, Space, List, Input, InputNumber } from 'antd'
import React, { useState, useEffect } from 'react'
import { useModel } from 'umi'
import { HiOutlineTicket } from 'react-icons/hi';

const Numbers: React.FC<{ count: number, editable: boolean, ary?: any }> = ({
    count,
    editable,
    ary = [
        1, 3, 4, 5,
        5, 6, 78, 20,
        3, 2, 4, 22,
        123, 44, 23, 3,
        12, 83, 40, 4,
        12, 83, 40, 4
    ],
    ...props
}) => {

    // const { lottoSize } = //useModel("lottery", (ret => ({ lottoSize: ret.lottoSize })))
    // count = 6
    const lottoSize = 4
    const maxRange = 100
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
            console.log(">>>>>>>>>>>>>>>> edit able", editable)
        }, []
    )

    return (
        (lottoSize * count) !== ary.length
            ? <span>数据错误</span>
            :
            <List
                dataSource={numbersArys}
                pagination={{
                    onChange: page => {
                        console.log(page);
                    },
                    pageSize: 4,
                    simple: true
                }}
                // size="large"
                // split
                renderItem={
                    (item, i) => (
                        <Space
                            align="center"
                            wrap
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                padding: "8px"
                            }}>
                            {
                                item.map((n) => {
                                    return (
                                        <InputNumber
                                            min={0}
                                            precision={0}
                                            max={maxRange}
                                            style={{ color: "#280D5F", textAlign: 'center' }}
                                            // onChange={inputOnChange}
                                            value={n}
                                            disabled={!editable}
                                            // size="large"
                                            // addonAfter={<HiOutlineTicket />}
                                        // maxLength={7}
                                        />

                                        // <Input
                                        //     style={{ width: 40, height: 40, textAlign: 'center' }}
                                        //     disabled={!editable}
                                        //     value={n} />
                                    )
                                })
                            }
                            <br />
                        </Space>
                    )
                }
            />
    )
}

export default Numbers