/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Button } from 'antd';
import { useModel, useIntl } from 'umi';

const EnableButton: React.FC<{ buyfn, approvefn }> = ({ buyfn, approvefn, ...props }) => {
    const { address, openWeb3Modal } = useModel("web3Model", (ret) => ({
        address: ret.status?.address,
        openWeb3Modal: ret.openWeb3Modal
    }))
    const { balanceOfUsdt, maxTickets } = useModel("lottery")
    const { tickets, cost, approved, approving, payloading, } = useModel("uimodel")

    return (
        <div style={{ marginLeft: "auto" }}>
            {
                // eslint-disable-next-line no-nested-ternary
                address ?
                    approved ?
                        (
                            <Button
                                type="primary"
                                size="large" shape="round"
                                disabled={
                                    tickets <= 0 ||
                                    Number(balanceOfUsdt) <= 0 ||
                                    tickets > maxTickets ||
                                    (cost - Number(balanceOfUsdt)) > 0
                                }
                                loading={payloading}
                                block
                                style={{
                                    height: "45px",
                                }}
                                onClick={buyfn}
                            >
                                {
                                    cost - Number(balanceOfUsdt) > 0 ? "余额不足" : "立即支付"
                                }
                            </Button>
                        )
                        :
                        (
                            <Button
                                type="primary"
                                size="large"
                                shape="round"
                                loading={approving}
                                block
                                style={{
                                    height: "45px",
                                }}
                                onClick={approvefn}
                            >
                                立即启用合约
                            </Button>
                        )
                    :
                    <Button
                        block
                        type="primary"
                        size="large"
                        shape="round"
                        style={{ height: "45px" }}
                        onClick={openWeb3Modal}
                    >
                        连接钱包
                    </Button>
            }
        </div>
    );
};
export default EnableButton;