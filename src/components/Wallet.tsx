import React, { useState, useEffect } from 'react';
const ethers = require('ethers');

const walletPath = "m/44'/60'/0'/0/1"; // last number for other wallets
const sampleSeed1 = "radar blur cabbage chef fix engine embark joy scheme fiction master release";
// pubKey 0: 0x0305b7d0996e99c4a49e6c3b83288f4740d53662839eab1d97d14660696944b8bb
// pubKey 1: 0x02b1909154b18127f617b63b1b57d6d37131e41c78a79826b08a04b721032dd9bc
const sampleSeed2 = "hope mouse focus family animal near chest february pipe access sudden please";
// pubKey 0: 0x03149f293dba7a6800df7cad92aa54e56b2ec8fec6989efeaefe9fa6f07534fe45
// pubKey 1: 0x02a6364b16bb2b40926142cb97fa4c37bf2bf46d999381fd3674152890fee81a4e

function Wallet() {
  const [seed, setSeed] = useState(sampleSeed1);
  const [publicKey, setPublicKey] = useState("");

  useEffect(() => {
    try { 
      let hdnode = ethers.utils.HDNode.fromMnemonic(seed);
      let node = hdnode.derivePath(walletPath);
      console.log(node)

      setPublicKey(node.publicKey);
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
        <span>{sampleSeed1}</span> <br/>
        <span>{sampleSeed2}</span> <br/>
      </p>
      <textarea rows={3} cols={100} 
        value={seed}
        onChange={e => setSeed(e.target.value)}/>
    </div>

    <div>
      <h3>Public key</h3>
      <span>{publicKey}</span>
    </div>
    </>
  );
}

export default Wallet;
