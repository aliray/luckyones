import { Badge, Popconfirm } from 'antd';
import React from 'react';
import { HiOutlineTicket } from 'react-icons/hi';
import { useModel } from 'umi';

const TicketsCount: React.FC<{ count: number }> = ({ count }) => {

    const { closeTicketsUi } = useModel("uimodel")

    return (
        <Popconfirm
            title={
                <div style={{ minHeight: "100px", minWidth: "300px" }}>
                    彩票数字展示待开发.
                </div>
            }
            icon={null}
            cancelText=""
            okText="重新生成"
        >
            <Badge count={count} showZero color="cyan">
                <a>
                    <HiOutlineTicket size="25px" color="#280D5F" onClick={() => { closeTicketsUi() }} />
                </a>
            </Badge>
        </Popconfirm>
    )
}

export default TicketsCount