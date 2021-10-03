/* eslint-disable @typescript-eslint/no-unused-vars */
import { ellipseAddress } from '@/utils/tools'
import { animated, useSpring } from '@react-spring/web'
import { Button, Space } from 'antd'
import React, { useState } from 'react'
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'
import { Link, SelectLang, useIntl, useModel } from 'umi'
import styles from './index.less'

const LogoIcon: React.FC = () => {
    const [logoClick, logoToggle] = useState(true)
    const { logoX } = useSpring({ from: { logoX: 0 }, logoX: logoClick ? 1 : 0, config: { duration: 1000 }, })
    return (
        <div className={styles.logo_left}>
            <Link to="/" style={{ display: "flex", alignItems: "center" }}
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
                    Luckyones
                </animated.p>
            </Link>
        </div>
    )
}

const ToolsBuuton: React.FC<{ address: string, eth: number }> = ({ address, eth }) => {
    const { status } = useModel("web3Model")
    return (
        <div className={styles.tools_button}>
            <Space>
                <a className={styles.button_item}>
                    {eth} ETH
                </a>
                <a className={styles.button_item} style={{ backgroundColor: "#722ED1", fontSize: "small" }}>
                    {address}
                </a>
                <a className={styles.button_item}>
                    <Jazzicon diameter={25} seed={jsNumberForAddress(status.address)} />
                </a>
            </Space>
        </div >
    );

}

const NavTools: React.FC = () => {
    const intl = useIntl()
    const { status, openWeb3Modal } = useModel("web3Model")
    const { balanceOfEth } = useModel("users")
    return (
        <div className={styles.nav_tools}>
            <Space align="center">
                {
                    (status?.provider?.isConnected() && status.address) ?
                        <ToolsBuuton address={ellipseAddress(status.address, 4)} eth={balanceOfEth} />
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
    )
}

const Header: React.FC = () => {
    return (
        <div className={styles.nav_top}>
            <LogoIcon />
            {/* <NavNotice /> */}
            <NavTools />
        </div>
    )
}

export default Header
