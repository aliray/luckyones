/* eslint-disable @typescript-eslint/no-unused-vars */
import { Modal } from 'antd';
import React from 'react';
import { useIntl } from 'umi';

const NumbersModal: React.FC<{ visible, cancel }> = ({ visible, cancel, ...props }) => {
    const intl = useIntl()

    return (
        <Modal
            transitionName=""
            visible={visible}
            footer={null}
            width={400}
            title="彩票号码"
            onCancel={() => cancel(false)}>
            <span>ss</span>
        </Modal>
    )
}

export default NumbersModal