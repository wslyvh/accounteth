import React, { useState, useEffect } from 'react';
import { HDNodeProps } from '../types';
const ethers = require('ethers');

const HDWalletListItem = (props: HDNodeProps) => {
    const [address, setAddress] = useState("");
    const [balance, setBalance] = useState(0);
    const [txCount, setTxCount] = useState(0);
  
    useEffect(() => {
        if (props.HDNode) { 
            try { 
                const runEffect = async () => {
                    const node = props.HDNode.derivePath(props.DerivationPath);
                    const provider = ethers.getDefaultProvider();
                    const wallet = new ethers.Wallet(node.privateKey, provider);
                    const balance = await wallet.getBalance();
                    const tx = await wallet.getTransactionCount();

                    setAddress(ethers.utils.getAddress(node.address));
                    setBalance(balance.toNumber());
                    setTxCount(tx);
                }

                runEffect();
            } catch { 
                console.log("Unable get wallet info..")
            }
        }
      });

    if (balance || txCount) { 
        return (
            <>
                <li>
                    <b>
                        <a href={"https://etherscan.io/address/" + address} target="_blank" rel="noopener noreferrer">{address}</a>
                    </b>
                    &nbsp;
                    <span>Ξ {balance}</span> 
                    &nbsp;
                    <span>(tx: {txCount})</span>
                </li>
            </>
        );
    } else { 
        return <></>
    }
}

export default HDWalletListItem;
