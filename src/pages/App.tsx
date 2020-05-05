import React from 'react';
import HDWalletList from '../components/HDWalletList';

function App() {
  return (
    <div className="container">
      <header>
        <h1>Account-eth</h1>
      </header>
      <div>
        <HDWalletList />
      </div>
    </div>
  );
}

export default App;
