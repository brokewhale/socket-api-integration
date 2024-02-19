import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

import { useGetQuote } from './services/queries/quote.query';
import { useMutation } from '@tanstack/react-query';
import { useGetFromTokenList } from './services/queries/fromTokenList.query';
import { useGetSupportedChains } from './services/queries/supportedChains.query';
import { useGetToTokenList } from './services/queries/toTokenList.query';
import { buildTx } from './services/api/buildTx.service';

function App() {
  const [count, setCount] = useState(0);
  const { data: supportedChains } = useGetSupportedChains();
  console.log(supportedChains);
  const params = {
    fromChainId: '10',
    toChainId: '100',
    disableSwapping: true,
    includeDexes: ['oneinch', 'zerox', 'rainbow'],
    includeBridges: ['hop', 'anyswap', 'anyswap-router-v4'],
    singleTxOnly: true,
    isShortList: true,
  };

  const { data: fromTokenList } = useGetFromTokenList(params);
  console.log('fromTokenList', fromTokenList);
  const { data: toTokenList } = useGetToTokenList(params);
  console.log('toTokenList', toTokenList);
  const Qparams = {
    fromChainId: '137',
    fromTokenAddress: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
    toChainId: '56',
    toTokenAddress: '0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3',
    fromAmount: '100000000',
    userAddress: '0x3e8cB4bd04d81498aB4b94a392c334F5328b237b',
    recipient: '0x3e8cB4bd04d81498aB4b94a392c334F5328b237b',
    uniqueRoutesPerBridge: true,
    sort: 'output',
  };
  const { data: quote } = useGetQuote(Qparams);
  const rr = quote?.result?.routes[0];
  console.log('quote', rr);

  const mutation = useMutation({
    mutationFn: buildTx,
  });

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <button onClick={() => mutation.mutate(rr)}>mutate</button>
    </>
  );
}

export default App;
