import React, { useState, useEffect } from 'react';
import HDWalletListItem from './HDWalletListItem';
const ethers = require('ethers');

const maxItems = 50;
const sampleSeed = "radar blur cabbage chef fix engine embark joy scheme fiction master release";

function HDWalletList() {
  const [seed, setSeed] = useState(sampleSeed);
  const [showEmpty, setShowEmpty] = useState(false);
  const [hdnode, setHdnode] = useState();

  useEffect(() => {
    console.log("Trigger seed change");
    if (ethers.utils.HDNode.isValidMnemonic(seed)) { 
      const node = ethers.utils.HDNode.fromMnemonic(seed);

      setHdnode(node);
    } else { 
      console.log("No valid mnemonic provided.")
    }
  }, [seed]);

  return (
    <>
    <div>
      <h2>Mnemonic seed</h2>
      <p>
        <b>Sample</b> <br/>
        <span>{sampleSeed}</span> <br/>
      </p>
      <textarea rows={3} cols={100} 
        value={seed}
        onChange={e => setSeed(e.target.value)}/>
    </div>

    <br/>

    <div>
      <button onClick={() => setShowEmpty(showEmpty ? false : true)}>Show/hide empty balances</button>
    </div>

    <div>
      <h3>Wallets <small>m/44'/60'/0'/0/{"{i}"}</small></h3>
      <ul>
          {[...Array(maxItems)].map((value, i) => 
            <HDWalletListItem HDNode={hdnode} DerivationPath={`m/44'/60'/0'/0/${i}`} key={i} ShowEmpty={showEmpty} />
          )}
      </ul>
      <h3>Wallets <small>m/44'/60'/0'/{"{i}"}/0</small></h3>
      <ul>
          {[...Array(maxItems)].map((value, i) => 
            <HDWalletListItem HDNode={hdnode} DerivationPath={`m/44'/60'/0'/${i}/0`} key={i} ShowEmpty={showEmpty} />
          )}
      </ul>
      <h3>Wallets <small>m/44'/60'/{"{i}"}'/0/0</small></h3>
      <ul>
          {[...Array(maxItems)].map((value, i) => 
            <HDWalletListItem HDNode={hdnode} DerivationPath={`m/44'/60'/${i}'/0/0`} key={i} ShowEmpty={showEmpty} />
          )}
      </ul>
    </div>
    </>
  );
}

export default HDWalletList;
