/* eslint-disable @typescript-eslint/no-unused-vars */

import ProCard from '@ant-design/pro-card'
import { Col, Divider, Row, Space } from 'antd'
import React from 'react'
import styles from './index.less'

const Rules: React.FC = (props) => {

    const extralTips: React.FC<{ txt: string }> = ({ txt, ...props }) => {
        return (
            <span className={styles.title}>
                {txt}
            </span>
        )
    }

    const cardStyle = {
        // border: "1.5px solid #A0A5D4",
        borderRadius: "20px",
        marginTop: "20px",
        minHeight: "200px"
    }

    return (
        <>
            <Row
                align="middle"
                justify="center"
                gutter={24}
                style={{ width: "100%" }}
            >
                <Col xs={{ span: 14 }} lg={{ span: 7 }} xl={{ span: 6 }} xxl={{ span: 5 }}>
                    <ProCard
                        title={extralTips({ txt: "购买彩票" })}
                        extra={
                            <span className={styles.extral_tips}>
                                第一步
                            </span>
                        }
                        style={cardStyle}
                        hoverable>
                        <p className={styles.content}>
                            价格在回合开始时确定，每张彩票相当于在 CAKE 中存入 5 美元。
                        </p>
                    </ProCard>
                </Col>
                <Col xs={{ span: 14 }} lg={{ span: 7 }} xl={{ span: 6 }} xxl={{ span: 5 }}>
                    <ProCard
                        title={extralTips({ txt: "等待开奖" })}
                        extra={
                            <span className={styles.extral_tips}>
                                第二步
                            </span>
                        }
                        style={cardStyle}
                        hoverable>
                        <p className={styles.content}>
                            每天有两次开奖：每 12 小时一次。
                        </p>
                    </ProCard>
                </Col>
                <Col xs={{ span: 14 }} lg={{ span: 7 }} xl={{ span: 6 }} xxl={{ span: 5 }}>
                    <ProCard
                        title={extralTips({ txt: "检查奖金" })}
                        extra={<span className={styles.extral_tips}>
                            第三步
                        </span>}
                        style={cardStyle}
                        hoverable>
                        <p className={styles.content}>
                            回合结束后，返回页面并检查您是否中奖！
                        </p>
                    </ProCard>
                </Col>
                <Col xs={{ span: 14 }} lg={{ span: 21 }} xl={{ span: 18 }} xxl={{ span: 15 }}>
                    <Divider />
                </Col>
            </Row>

            <Row
                align="top"
                justify="center"
                gutter={24}
                style={{ width: "100%" }}
            >
                <Col className="none_bgcard"
                    xs={{ span: 14 }} lg={{ span: 14 }} xl={{ span: 12 }} xxl={{ span: 10 }}>
                    <ProCard style={{ marginTop: "20px", borderRadius: "20px" }}>
                        <p className={styles.title}>
                            中将条件 彩票上的数字必须以正确的顺序命中才能中奖。
                        </p>
                        <p className={styles.content}>
                            有 A 和 B 两张彩票 <br />
                            * 彩票 A：前 3 位和后 2 位命中，但第 4 位错误，所以此彩票仅赢得了“命中前 3 位”奖。 <br />
                            * 彩票 B：尽管命中最后 5 位数字，但第一位数字是错误的，因此这张彩票并未中奖。 <br />
                            * 奖金组不可“叠加”：如果您按顺序命中前 3 位数字，则您将只能赢得“命中 3 位”组中的奖金，而不会赢得“命中 1 位”和“命中 2 位”组中的奖金。 <br />
                        </p>
                    </ProCard>
                </Col>
                <Col xs={{ span: 14 }} lg={{ span: 7 }} xl={{ span: 6 }} xxl={{ span: 5 }}>
                    <ProCard
                        style={{ ...cardStyle, marginTop: "20px", borderRadius: "20px", minHeight: "250px" }}
                        hoverable>
                        sss
                    </ProCard>
                </Col>
                <Col xs={{ span: 14 }} lg={{ span: 21 }} xl={{ span: 18 }} xxl={{ span: 15 }}>
                    <Divider />
                </Col>
            </Row>

            <Row
                align="top"
                justify="center"
                gutter={24}
                style={{ width: "100%" }}
            >
                <Col className="none_bgcard"
                    xs={{ span: 14 }} lg={{ span: 14 }} xl={{ span: 12 }} xxl={{ span: 10 }}>
                    <ProCard style={{ marginTop: "20px", borderRadius: "20px" }}>
                        <p className={styles.title}>
                            奖金资金
                        </p>
                        <p className={styles.content}>
                            购票者购买该回合彩票所支付的 USDT 将全部注入回奖池。
                        </p>
                    </ProCard>
                </Col>
                <Col xs={{ span: 14 }} lg={{ span: 7 }} xl={{ span: 6 }} xxl={{ span: 5 }}>
                    <ProCard
                        style={{ ...cardStyle, marginTop: "20px", borderRadius: "20px", minHeight: "250px" }}
                        hoverable>
                        内容
                    </ProCard>
                </Col>
                <Col xs={{ span: 14 }} lg={{ span: 21 }} xl={{ span: 18 }} xxl={{ span: 15 }}>
                    <Divider />
                </Col>
            </Row>

        </>
    )
}

export default Rules
