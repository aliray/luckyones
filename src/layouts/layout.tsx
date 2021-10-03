/* eslint-disable @typescript-eslint/no-unused-vars */

import { Footer, Header } from '@/components/Common';
import RadioMenu from '@/components/RadioButton';
import React, { useEffect } from 'react';
import { useLocation, useModel } from 'umi';
import styles from './index.less';
import moment from 'moment';
import NavNotice from '@/components/Common/navNotice';

const Lottery: React.FC = (props) => {
    const menus = [
        { name: "当前回合", url: "/lottery" },
        { name: "购买历史", url: "/lottery/user/trades" },
        { name: "玩法", url: "/lottery/rules" }
    ]

    const bgcolors = {
        "/lottery": 'container_bg_lottery',
        "/lottery/user/trades": 'container_bg_lottery',
        "/lottery/rules": 'container_bg_rules'
    }

    const { curRenderLottery } = useModel("lottery");
    const location = useLocation();

    useEffect(() => { console.log(styles) }, [])

    return (
        <div className={`${styles.container} ${bgcolors[location.pathname]}`}>
            <Header />
            <div className={styles.content}>
                {
                    curRenderLottery && moment(Number(curRenderLottery?.endTime)).isAfter(moment.now()) && <NavNotice />
                }
                <RadioMenu values={menus} />
                {
                    props.children
                }
            </div>
            <Footer />
        </div >
    );
};

export default Lottery;
