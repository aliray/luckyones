import { Popover } from 'antd';
import React from 'react';
import { HiOutlineTicket } from 'react-icons/hi';
import Numbers from '../Numbers';
import styles from './index.less';

const TicketsCount: React.FC<{ count: number, editable?: boolean }> = ({ count, editable = false }) => {
    return (
        <Popover
            trigger="click"
            style={{ borderRadius: "20px" }}
            content={
                <Numbers editable={editable} />
            }
        >
            <a className={styles.ticket_a}>
                <span>{count}张</span><HiOutlineTicket className={styles.tickets_font} />
            </a>
        </Popover>
    )
}

export default TicketsCount