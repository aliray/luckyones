/* eslint-disable @typescript-eslint/no-unused-vars */

import { Footer, Header } from '@/components/Common';
import RadioMenu from '@/components/RadioButton';
import React from 'react';
import { useLocation, useModel } from 'umi';
import styles from './index.less';
import moment from 'moment';
import NavNotice from '@/components/Common/NavNotice';

const Lottery: React.FC = (props) => {
    const menus = [
        { name: "当前回合", url: "/lottery" },
        { name: "购买历史", url: "/lottery/user/trades" },
        { name: "玩法", url: "/lottery/rules" }
    ]

    const bgcolors = {
        "/lottery": {
            "background": "radial-gradient(circle, rgba(169,201,255,1) 0%, rgba(255,187,236,1) 100%)"
        },
        "/lottery/user/trades": {
            "background": "radial-gradient(circle, rgba(169,201,255,1) 0%, rgba(255,187,236,1) 100%)"
        },
        "/lottery/rules": {
            // "background": "rgb(169,201,255)",
            "background": "radial-gradient(circle, rgba(169,201,255,1) 0%, rgba(255,187,236,1) 100%)"
        }
    }

    const { curRenderLottery } = useModel("lottery");
    const location = useLocation();

    return (
        <div className={styles.container} style={
            bgcolors[String(location.pathname)]
        }>
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
