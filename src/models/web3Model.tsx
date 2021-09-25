/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */

import { useState, useCallback, useEffect } from 'react'
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3 from "web3";
import Web3Modal from "web3modal";
import type { STATUS } from '@/utils/types';

export default function web3Model() {

    const providerOptions = {
        walletconnect: {
            package: WalletConnectProvider, // required
            options: {
                infuraId: "INFURA_ID" // required
            }
        }
    };

    const web3Modal = new Web3Modal({
        network: "mainnet",
        cacheProvider: true,
        providerOptions
    });

    const [status, setStatus] = useState<STATUS>();

    const disconnect = async () => {
        if (
            status.web3 &&
            status.web3?.currentProvider &&
            status.web3?.currentProvider.close
        ) {
            await status.web3.currentProvider.close();
        }
        web3Modal.clearCachedProvider();
        setStatus({
            provider: null,
            address: null,
            connected: false,
            web3: null,
            networkId: null,
            chainId: null
        });
    }

    const openWeb3Modal = async () => {
        try {
            const provider = await web3Modal.connect();
            const web3 = new Web3(provider);
            const accounts = await web3.eth.getAccounts();

            const curStatus = {
                ...status,
                provider,
                web3,
                address: accounts[0],
                connected: true,
            }
            setStatus(curStatus)

            if (provider.on) {
                provider.on("accountsChanged", async (_accounts: string[]) => {
                    if (_accounts[0]) {
                        setStatus({ ...curStatus, address: _accounts[0] })
                    } else {
                        disconnect();
                    }
                });
                provider.on("chainChanged", async (chainId: number) => {
                    setStatus({ ...curStatus, chainId })
                });
            }
            // eslint-disable-next-line no-empty
        } catch (error) {
            console.log(error);     // 弹出钱包连接界面,如果关闭也会抛出异常
        }
    }

    useEffect(() => {
        if (web3Modal.cachedProvider) {
            openWeb3Modal()
        }
    }, []);

    return { status, ...status, openWeb3Modal, disconnect }

}