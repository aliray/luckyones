import { Popover } from 'antd';
import React from 'react';
import { HiOutlineTicket } from 'react-icons/hi';
import Numbers from '../Numbers';

const TicketsCount: React.FC<{ count: number, editable?: boolean }> = ({ count, editable = false }) => {
    return (
        <Popover content={<Numbers editable={editable} count={6} />} trigger="click">
            <a style={{ display: "flex", fontWeight: "bold" }}>
                {count}张<HiOutlineTicket size="25px" color="#280D5F" />
            </a>
        </Popover>
    )
}

export default TicketsCount