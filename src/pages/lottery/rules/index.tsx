/* eslint-disable @typescript-eslint/no-unused-vars */

import ProCard from '@ant-design/pro-card'
import { Col, Divider, Row, Space, Avatar } from 'antd'
import React from 'react'
import styles from './index.less'

const Rules: React.FC = (props) => {

    const extralTips: React.FC<{ txt: string }> = ({ txt }) => {
        return (
            <span className={styles.title}>
                {txt}
            </span>
        )
    }
    const colorlist = ["pink", "gold", "magenta", "orange", "cyan", "#531dab"]
    const prizedis = [2, 3, 5, 10, 20, 60]
    const prizenumbers = [1, 3, 9, 2, 5, 5]
    const anumbers = {
        0: {
            borderTopLeftRadius: "20px",
            borderBottomLeftRadius: "20px",
            borderLeft: "0.6px solid #531dab"
        },
        2: {
            borderTopRightRadius: "20px",
            borderBottomRightRadius: "20px",
            borderRight: "0.6px solid #531dab"
        }
    }
    const bnumbers = {
        1: {
            borderTopLeftRadius: "20px",
            borderBottomLeftRadius: "20px",
            borderLeft: "0.6px solid #531dab"
        },
        5: {
            borderTopRightRadius: "20px",
            borderBottomRightRadius: "20px",
            borderRight: "0.6px solid #531dab"
        }
    }

    const PrizeList: React.FC<{ prizesdistribute: number[] }> = ({ prizesdistribute }) => {
        return (
            <>
                {
                    prizesdistribute.map((dis, i) => {
                        return (
                            <div key={i} style={{ width: "100%", display: "flex", marginTop: "5px", color: "#531dab" }}>
                                <Space direction="horizontal">
                                    <Avatar size="small" style={{ backgroundColor: colorlist[i] }} />
                                    {`命中前${i + 1}位`}
                                </Space>
                                <span style={{ marginLeft: "auto", fontWeight: "bold" }}>  {dis}% 奖励</span>
                            </div>)
                    })
                }
            </>
        )
    }

    const cardStyle = {
        border: "1.5px solid #A0A5D4",
        borderRadius: "20px",
        marginTop: "20px",
        minHeight: "200px",
        // backgroundColor: "#F0EEF4"
    }

    return (
        <div className={styles.rules_main}>
            <div className={styles.rules_row}>
                <ProCard
                    title={extralTips({ txt: "购买彩票" })}
                    extra={
                        <span className={styles.extral_tips}>
                            第一步
                        </span>
                    }
                    bordered={false}
                    style={cardStyle}
                    hoverable>
                    <p className={styles.content}>
                        价格在回合开始时确定，每张彩票相当于在 CAKE 中存入 5 美元。
                    </p>
                </ProCard>
                <ProCard
                    title={extralTips({ txt: "等待开奖" })}
                    extra={
                        <span className={styles.extral_tips}>
                            第二步
                        </span>
                    }
                    style={{ ...cardStyle, marginLeft: "20px" }}
                    hoverable>
                    <p className={styles.content}>
                        每天有两次开奖：每 12 小时一次。
                    </p>
                </ProCard>
                <ProCard
                    title={extralTips({ txt: "检查奖金" })}
                    extra={<span className={styles.extral_tips}>
                        第三步
                    </span>}
                    style={{ ...cardStyle, marginLeft: "20px" }}
                    hoverable>
                    <p className={styles.content}>
                        回合结束后，返回页面并检查您是否中奖！
                    </p>
                </ProCard>
            </div>
            <div className={styles.rules_row}>
                <div className={styles.p_rules}>
                    <p className={styles.title}>
                        中奖条件
                    </p>
                    <p className={styles.content}>
                        彩票上的数字必须以正确的顺序命中才能中奖。 <br />
                        - 彩票 A：前 3 位和后 2 位命中，但第 4 位错误，所以此彩票仅赢得了“命中前 3 位”奖。 <br />
                        - 彩票 B：尽管命中最后 5 位数字，但第一位数字是错误的，因此这张彩票并未中奖。 <br />
                        - 奖金组不可“叠加”：如果您按顺序命中前 3 位数字，则您将只能赢得“命中 3 位”组中的奖金，而不会赢得“命中 1 位”和“命中 2 位”组中的奖金。 <br />
                    </p>
                </div>
                <ProCard
                    style={{ ...cardStyle, marginTop: "20px", borderRadius: "20px" }}
                    hoverable>
                    <Row align="middle" justify="center">
                        <Col offset={2} span={20}>
                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                {
                                    prizenumbers.map((n, i) => {
                                        return (
                                            <span className={styles.list_tips}>
                                                <Avatar size="small" style={{ backgroundColor: colorlist[i] }} >{n}</Avatar>
                                            </span>

                                        )
                                    })
                                }
                            </div>
                        </Col>
                    </Row>
                    <br />
                    <Row align="middle" justify="center">
                        <Col span={2}>
                            <span className={styles.list_tips}>A</span>
                        </Col>
                        <Col span={20}>
                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                {
                                    [1, 3, 9, 0, 1, 1].map((n, i) => {
                                        return (
                                            <span className={styles.list_tips}
                                                style={
                                                    n === prizenumbers[i] ?
                                                        {
                                                            borderTop: `0.6px solid #531dab`,
                                                            borderBottom: `0.6px solid #531dab`,
                                                            ...anumbers[i],
                                                            color: colorlist[i]
                                                        }
                                                        :
                                                        {
                                                            color: "lightgray"
                                                        }
                                                }
                                            >{n}</span>
                                        )
                                    })
                                }
                            </div>
                        </Col>
                    </Row>
                    <Row align="middle" justify="center" style={{ marginTop: "10px" }}>
                        <Col span={2}>
                            <span className={styles.list_tips}>B</span>
                        </Col>
                        <Col span={20}>
                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                {
                                    [7, 3, 9, 2, 5, 5].map((n, i) => {
                                        return (
                                            <span
                                                className={styles.list_tips}
                                                style={
                                                    n === prizenumbers[i] ?
                                                        {
                                                            borderTop: `0.6px solid #531dab`,
                                                            borderBottom: `0.6px solid #531dab`,
                                                            ...bnumbers[i],
                                                            color: "lightgray"
                                                        } :
                                                        {
                                                            color: "lightgray"
                                                        }
                                                }
                                            >{n}</span>
                                        )
                                    })
                                }
                            </div>
                        </Col>
                    </Row>
                </ProCard>
            </div>
            <div className={styles.rules_row}>
                <ProCard
                    style={{ ...cardStyle, marginTop: "20px", borderRadius: "20px", minHeight: "250px", flex: 1 }}
                    hoverable>
                    <PrizeList prizesdistribute={prizedis} />
                </ProCard>
                <div className="none_bgcard">
                    <ProCard style={{ marginTop: "20px", borderRadius: "20px", textAlign: "right" }}>
                        <p className={styles.title}>
                            奖金资金
                        </p>
                        <p className={styles.content}>
                            购票者购买该回合彩票所支付的 USDT 将全部注入回奖池。
                        </p>
                    </ProCard>
                </div>
            </div>
        </div>
    )
}

export default Rules
