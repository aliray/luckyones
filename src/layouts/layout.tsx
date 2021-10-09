/* eslint-disable @typescript-eslint/no-unused-vars */

import { Footer, Header } from '@/components/Common';
import RadioMenu from '@/components/RadioButton';
import React, { useEffect, useState } from 'react';
import { useLocation, useModel } from 'umi';
import styles from './index.less';
import moment from 'moment';
import NavNotice from '@/components/Common/NavNotice';
import { Div } from '@/components/Html';
import { WavesBg } from '@/components/BackGroundSvg';
import { WavesStars } from '@/components/BgStars';

const Lottery: React.FC = (props) => {
    const menus = [
        { name: "当前回合", url: "/lottery" },
        { name: "购买历史", url: "/lottery/user/trades" },
        { name: "玩法", url: "/lottery/rules" }
    ]

    const bgcolors = {
        "/lottery": 'container_bg_lottery',
        "/lottery/user/trades": 'container_bg_lottery',
        "/lottery/rules": 'container_bg_lottery'
    }

    const { curRenderLottery } = useModel("lottery");
    const location = useLocation();
    useEffect(() => { console.log(styles) }, [])

    return (

        <Div classNames={["container", String(bgcolors[location.pathname])]} lessStyles={styles}>
            <WavesBg />
            {/* <WavesStars /> */}
            <Header />
            <div className={styles.content}>
                <div className={styles.menu_header}>
                    <RadioMenu values={menus} />
                    <NavNotice />
                    {/* {
                        curRenderLottery && moment(Number(curRenderLottery?.endTime)).isAfter(moment.now()) && <NavNotice />
                    } */}
                </div>
                {
                    props.children
                }
            </div>
            <Footer />
        </Div >
    );
};

export default Lottery;
