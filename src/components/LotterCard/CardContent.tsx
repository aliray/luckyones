/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Skeleton, Space } from 'antd';
import React, { useState } from 'react';
import { useIntl, useModel } from 'umi';
import BuyActionModal from '../Modal/BuyActionModal';
import TicketsCount from '../TicketsCount';
import Lotteryballs from '../Tools/Lotteryballs';
import RewardsTips from '../Tools/rewardsTips';
import styles from './index.less';

const LotteryCardContent: React.FC = (props) => {
    const { status, openWeb3Modal } = useModel("web3Model");
    const intl = useIntl();
    const {
        loadingLottery,
        curRenderLottery,
        currentLotteryId,
        currentRewards
    } = useModel("lottery", (ret) => ({
        loadingLottery: ret.loadingLottery,
        curRenderLottery: ret.curRenderLottery,
        currentRewards: ret.currentRewards,
        currentLotteryId: ret.currentLotteryId
    }));

    const { getUserTicketsCount } = useModel(
        "users", (ret) => ({
            // userLotteries: ret.userLotteries,
            getUserTicketsCount: ret.getUserTicketsCount
        }));

    const finalNumber = [];
    const [modalUi, triggerModal] = useState(false);
    const buyTicketsAction = () => {
        triggerModal(true);
    }

    return (
        <>
            <div className={styles.content}>
                <Skeleton active loading={loadingLottery} paragraph={{ rows: 2 }}>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            width: "100%",
                            fontSize: "20px"
                        }}
                    >
                        <Space size="large">
                            <span className={styles.title}>奖池</span>
                            <RewardsTips
                                value={
                                    currentLotteryId === curRenderLottery.id ? currentRewards
                                        : Number(curRenderLottery?.totalTickets) * Number(curRenderLottery?.ticketPrice)
                                }
                            />
                        </Space>
                    </div>
                    {/* final numbers */}
                    {
                        finalNumber && finalNumber.length > 0 ?
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    width: "100%",
                                    marginTop: "auto"
                                }}
                            >
                                <Space>
                                    <span className={styles.title}>中将号码</span>
                                    <div>
                                        {
                                            [9, 3, 4, 5, 6, 2].map((v, i) => {
                                                return (
                                                    <Lotteryballs number={v} key={i} />
                                                )
                                            })
                                        }

                                    </div>
                                </Space>
                            </div> : null
                    }
                    {/* user tickets */}
                    {
                        // !finalNumber
                        //     && curRenderLottery.id === currentLottery.id
                        //     && moment(Number(curRenderLottery?.endTime)).isAfter(moment().fromNow())
                        true
                            ?
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    width: "100%",
                                    marginTop: "20px"
                                }}
                            >
                                <Space size="large" align="center">
                                    <span className={styles.title}>您的彩票</span>
                                    <TicketsCount count={getUserTicketsCount(curRenderLottery?.id) || 0} />
                                    {
                                        !(status?.provider?.isConnected() && status.address) ?
                                            <Button type="primary" size="large" shape="round" onClick={openWeb3Modal}>
                                                {intl.formatMessage({ id: 'pages.wallet.connectTips' })}
                                            </Button>
                                            :
                                            <Button type="primary" size="large" shape="round" onClick={buyTicketsAction}>
                                                {intl.formatMessage({ id: 'pages.wallet.buyButtonTips' })}
                                            </Button>
                                    }
                                </Space>
                            </div> : null
                    }
                </Skeleton>
            </div>
            <BuyActionModal visible={modalUi} cancel={triggerModal} />
        </>
    );
};
export default LotteryCardContent;