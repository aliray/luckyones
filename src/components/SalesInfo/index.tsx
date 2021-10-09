import { Typography } from 'antd'
import React from 'react'

const SalesInfo: React.FC<{ maxTickets, ticketPrice, symbol }> = ({ maxTickets, ticketPrice, symbol }) => {

    return (
        <Typography.Text
            type="secondary"
            style={{ fontSize: "13px", textAlign: "left" }}>
            {
                `立即购买会选择随机号码，且您的彩票中无重复号码,最多购置${maxTickets},单价${ticketPrice}${symbol}`
            }
        </Typography.Text>
    )
}

export default SalesInfo;