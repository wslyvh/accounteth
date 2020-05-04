import React, { useState, useEffect } from 'react';

function Wallet() {
  const [seed, setSeed] = useState("");

  useEffect(() => {
      console.log(seed)
  }, [seed]);
  
  return (
    <div>
        <span>Mnemonic seed</span> <br/>
        <textarea rows={3} cols={100} 
          value={seed}
          onChange={e => setSeed(e.target.value)}/>
    </div>
  );
}

export default Wallet;
