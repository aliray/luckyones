import { notification } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import styles from './index.less';

notification.config({
    duration: 4
    // rtl: true,
});

const NoticeSuccess = (message) => {
    notification.success({
        message: <span className={styles.message}>{message}</span>,
        className: styles.notice,
        icon: <CheckCircleOutlined />,
    });
}

const NoticeWarn = (message) => {
    notification.warning({
        message: <span className={styles.message}>{message}</span>,
        className: styles.notice,
        icon: <ExclamationCircleOutlined />,
    });
}

const NoticeError = (message) => {
    notification.error({
        message: <span className={styles.err_message}>{message}</span>,
        className: styles.err_notice,
        icon: <CloseCircleOutlined />,
    });
}

export { NoticeSuccess, NoticeWarn, NoticeError };