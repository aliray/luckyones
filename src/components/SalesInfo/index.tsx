import { Typography } from 'antd'
import React from 'react'
import { MoneyTipsNormal } from '../MoneyTips'

const SalesInfo: React.FC<{ maxTickets, ticketPrice, symbol }> = ({ maxTickets, ticketPrice, symbol }) => {

    return (
        <Typography.Text
            type="secondary"
            style={{ fontSize: "13px", textAlign: "left" }}>
            立即购买会选择随机号码，且您的彩票中无重复号码,最多购置
            <MoneyTipsNormal money={maxTickets} unit="张" />
            ,单价
            <MoneyTipsNormal money={ticketPrice || 0} unit={symbol} />.
        </Typography.Text>
    )
}

export default SalesInfo;