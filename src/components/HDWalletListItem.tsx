import React, { useState, useEffect } from 'react';
import { HDNodeProps } from '../types';
const ethers = require('ethers');

const HDWalletListItem = (props: HDNodeProps) => {
    const [address, setAddress] = useState("");
    const [balance, setBalance] = useState(0);
    const [txCount, setTxCount] = useState(0);
    const [tokens, setTokens] = useState([]);
  
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

                    if (balance > 0 || txCount > 0) { 
                        const response = await fetch(`https://api.ethplorer.io/getAddressInfo/${ethers.utils.getAddress(node.address)}?apiKey=freekey`);
                        const body = await response.json();

                        if (body.tokens) {
                            const tokens = body.tokens.map((token: any) => { return { 
                                address: token.tokenInfo.address,
                                name: token.tokenInfo.name ?? token.tokenInfo.address,
                                symbol: token.tokenInfo.symbol ?? token.tokenInfo.address,
                                decimals: parseFloat(token.tokenInfo.decimals),
                                balance: parseFloat(token.balance)
                            }});

                            setTokens(tokens);
                        }
                    }
                }

                runEffect();
            } catch { 
                console.log("Unable get wallet info..")
            }
        }
      }, [address, props.DerivationPath, props.HDNode, txCount]);

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
                    <span>nonce: {txCount}</span>
                    &nbsp;
                    <span>tokens: {tokens.length}</span>
                </li>
            </>
        );
    } else { 
        return <></>
    }
}

export default HDWalletListItem;
