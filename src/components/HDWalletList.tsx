import React, { useState, useEffect } from 'react';
import HDWalletListItem from './HDWalletListItem';
const ethers = require('ethers');

const walletPath = "m/44'/60'/0'/0/"; // + address index
const defaultSeed = "radar blur cabbage chef fix engine embark joy scheme fiction master release";
const sampleSeed = "hope mouse focus family animal near chest february pipe access sudden please";

function HDWalletList() {
  const [seed, setSeed] = useState(defaultSeed);
  const [hdnode, setHdnode] = useState();

  useEffect(() => {
    try { 
      const node = ethers.utils.HDNode.fromMnemonic(seed);

      setHdnode(node);
    } catch { 
      console.log("No valid mnemonic provided..")
    }
  }, [seed]);
  
  return (
    <>
    <div>
      <h2>Mnemonic seed</h2>
      <p>
        <b>Samples</b> <br/>
        <span>{sampleSeed}</span> <br/>
      </p>
      <textarea rows={3} cols={100} 
        value={seed}
        onChange={e => setSeed(e.target.value)}/>
    </div>

    <div>
      <h2>Wallets</h2>
      <ul>
          <HDWalletListItem HDNode={hdnode} DerivationPath={walletPath + 0} />
          <HDWalletListItem HDNode={hdnode} DerivationPath={walletPath + 1} />
          <HDWalletListItem HDNode={hdnode} DerivationPath={walletPath + 2} />
          <HDWalletListItem HDNode={hdnode} DerivationPath={walletPath + 3} />
          <HDWalletListItem HDNode={hdnode} DerivationPath={walletPath + 4} />
          <HDWalletListItem HDNode={hdnode} DerivationPath={walletPath + 5} />
          <HDWalletListItem HDNode={hdnode} DerivationPath={walletPath + 6} />
          <HDWalletListItem HDNode={hdnode} DerivationPath={walletPath + 7} />
          <HDWalletListItem HDNode={hdnode} DerivationPath={walletPath + 8} />
          <HDWalletListItem HDNode={hdnode} DerivationPath={walletPath + 9} />
      </ul>
    </div>
    </>
  );
}

export default HDWalletList;
