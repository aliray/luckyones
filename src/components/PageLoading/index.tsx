/* eslint-disable @typescript-eslint/no-unused-vars */
import { Spin } from 'antd'
import React from 'react'
import { LoadingOutlined } from '@ant-design/icons';

const PageLoading: React.FC = (props) => {
    return (
        <div style={{
            paddingTop: 100,
            textAlign: 'center'
        }}>
            <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
        </div >
    )
}
export default PageLoading