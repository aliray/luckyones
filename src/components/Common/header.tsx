/* eslint-disable @typescript-eslint/no-unused-vars */
import RewardsTips from '@/components/Tools/rewardsTips';
import { ellipseAddress } from '@/utils/tools';
import { DownOutlined, HistoryOutlined, LoginOutlined, WalletOutlined } from '@ant-design/icons';
import { animated, useSpring } from '@react-spring/web';
import { Button, Dropdown, Menu, Space, Statistic } from 'antd';
import React, { useState } from 'react';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import { Link, SelectLang, useIntl, useModel } from 'umi';
import styles from './index.less';

const LogoIcon: React.FC = (props) => {
    const [logoClick, logoToggle] = useState(true);
    const { logoX } = useSpring({ from: { logoX: 0 }, logoX: logoClick ? 1 : 0, config: { duration: 1000 }, })
    return (
        <div className={styles.logo_left}>
            <Link to="/"
                style={{ display: "flex", alignItems: "center" }}
                onMouseEnter={() => { logoToggle(!logoClick) }}
                onMouseLeave={() => { logoToggle(!logoClick) }}>
                <animated.p
                    className={styles.logo}
                    style={{
                        opacity: logoX.to({ range: [1, 2], output: [1, 1.3, 1.4, 1.7, 1.8, 2] }),
                        scale: logoX.to({
                            range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
                            output: [1, 0.97, 0.9, 1.1, 0.9, 1.1, 1.03, 1],
                        }),
                        willChange: "opacity"
                    }}
                >
                    &#127942;
                </animated.p>
                <span className={styles.logo_title}>Luckyones</span>
            </Link>
        </div>
    );
}

const NavTools: React.FC = () => {
    const intl = useIntl();
    const { status, openWeb3Modal, disconnect } = useModel("web3Model");

    const clickMenuItem = ({ item, key, keyPath, domEvent }) => {
        if (key === "1") {
            disconnect();
        }
    }
    const menu = [
        // { name: "钱包", url: "", icon: <WalletOutlined /> },
        { name: "购买历史", url: "/lottery/user/trades", icon: <HistoryOutlined /> },
        { name: "断开连接", url: "", icon: <LoginOutlined />, danger: true, divider: true }
    ];

    return (
        <div className={styles.nav_tools}>
            <Space align="center">
                {
                    (status?.provider?.isConnected() && status.address) ?
                        (
                            <Dropdown overlay={
                                <Menu style={{ minWidth: "160px" }} onClick={clickMenuItem}>
                                    {
                                        menu.map((v, i) => {
                                            return (
                                                <> {v.divider ? (<Menu.Divider />) : null}</>,
                                                <Menu.Item icon={v.icon} key={i} danger={v.danger}>
                                                    <Link to={v.url}>
                                                        {v.name}
                                                    </Link>
                                                </Menu.Item>
                                            )
                                        })
                                    }
                                </Menu>
                            }>
                                <div className={styles.jzicon}>
                                    <Jazzicon diameter={30} seed={jsNumberForAddress(status.address)} />
                                    <span >
                                        {ellipseAddress(status.address, 6)}
                                        &nbsp;<DownOutlined />
                                    </span>
                                </div>
                            </ Dropdown>
                        )
                        :
                        <Button type="primary" size="large" shape="round" onClick={openWeb3Modal}>
                            {intl.formatMessage({ id: 'pages.wallet.connectTips' })}
                        </Button>
                }
                <div className={styles.lang} data-lang>
                    {SelectLang && <SelectLang />}
                </div>
            </Space>
        </div>
    );
}

const Header: React.FC = (props) => {
    return (
        <div className={styles.nav_top}>
            <LogoIcon />
            {/* <NavNotice /> */}
            <NavTools />
        </div>
    );
};

export default Header;