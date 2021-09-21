/* eslint-disable @typescript-eslint/no-unused-vars */

import { Footer, Header } from '@/components/Common';
import NavNotice from '@/components/Common/navNotice';
import RadioMenu from '@/components/RadioButton';
import React from 'react';
import { useModel } from 'umi';
import styles from './index.less';


const Lottery: React.FC = (props) => {
    const menus = [
        { name: "当前回合", url: "/lottery" },
        { name: "购买历史", url: "/lottery/user/trades" },
        { name: "玩法", url: "/lottery/rules" }
    ]
    const { curRenderLottery } = useModel("lottery");

    return (
        // <Web3ReactProvider getLibrary={getLibrary}>
        <div className={styles.container}>
            <Header />
            <div className={styles.content}>
                {
                    curRenderLottery && <NavNotice />
                }
                <RadioMenu values={menus} />
                {
                    props.children
                }
            </div>
            <Footer />
        </div >
        // </Web3ReactProvider>
    );
};

export default Lottery;
