/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

import { useGetQuote } from './services/queries/quote.query';
import { useMutation } from '@tanstack/react-query';

import { buildTx } from './services/api/buildTx.service';
import { ethers } from 'ethers';
import { checkAllowance } from './services/api/checkAllowance.service';
import { getApprovalTransactionData } from './services/api/approvalTransactionData.service';

function App() {
  const [count, setCount] = useState(0);
  const [allowanceParams, setAllowanceParams] = useState<any>({
    chainID: null,
    owner: null,
    allowanceTarget: null,
    tokenAddress: null,
  });

  const [connected, setConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  // Function to connect/disconnect the wallet
  async function connectWallet() {
    if (!connected) {
      // Connect the wallet using ethers.js

      await provider.send('eth_requestAccounts', []);
      const signer = await provider.getSigner();
      const _walletAddress = await signer.getAddress();
      setConnected(true);
      setWalletAddress(_walletAddress);
    } else {
      // Disconnect the wallet
      window.ethereum.selectedAddress = null;
      setConnected(false);
      setWalletAddress('');
    }
  }
  console.log('walletAddress', walletAddress);

  // Bridging Params fetched from users
  const Qparams = {
    fromChainId: '137',
    fromTokenAddress: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
    toChainId: '137',
    toTokenAddress: '0x3c499c542cef5e3811e1192ce70d8cc03d5c3359',
    fromAmount: '2000000',
    userAddress: '0xBdC23C7bF49250131555e1c216b9280a7a9bf7C9',
    recipient: '0xBdC23C7bF49250131555e1c216b9280a7a9bf7C9',
    uniqueRoutesPerBridge: true,
    sort: 'output',
    singleTxOnly: true,
  };
  const { data: quote } = useGetQuote(Qparams);

  // Choosing first route from the returned route results
  const route = quote?.result.routes[0];
  const buildTxParams = {
    route: route,
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [neededBuildData, setNeededBuildData] = useState<any>();
  const mutation = useMutation({
    mutationFn: buildTx,
    onSuccess(data) {
      console.log('data', data);
      const approvalData = data?.result?.approvalData;
      const { minimumApprovalAmount, allowanceTarget } = approvalData;
      const txTarget = data?.result?.txTarget;
      setNeededBuildData({
        minimumApprovalAmount,
        allowanceTarget,
        txTarget,
        approvalData,
      });
      if (approvalData !== null) {
        const allowanceParam = {
          chainID: Qparams.fromChainId,
          owner: walletAddress,
          allowanceTarget: allowanceTarget,
          tokenAddress: Qparams.fromTokenAddress,
        };
        setAllowanceParams(allowanceParam);
      }
    },
  });

  async function getApproval() {
    try {
      const res = await checkAllowance(allowanceParams);
      const allowanceValue = res.result?.value;
      if (neededBuildData.minimumApprovalAmount > allowanceValue) {
        const approvalTransactionData = await getApprovalTransactionData({
          ...allowanceParams,
          amount: Qparams.fromAmount,
        });
        const signer = await provider.getSigner();

        const gasPrice = await signer.getGasPrice();

        const gasEstimate = await provider.estimateGas({
          from: walletAddress,
          to: approvalTransactionData.result?.to,
          value: '0x00',
          data: approvalTransactionData.result?.data,
          gasPrice: gasPrice,
        });

        const tx = await signer.sendTransaction({
          from: approvalTransactionData.result?.from,
          to: approvalTransactionData.result?.to,
          value: '0x00',
          data: approvalTransactionData.result?.data,
          gasPrice: gasPrice,
          gasLimit: gasEstimate,
        });
        // Initiates approval transaction on user's frontend which user has to sign
        const receipt = await tx.wait();

        console.log('Approval Transaction Hash :', receipt.transactionHash);
      }
    } catch (error) {
      console.log('error', error);
    }
  }

  async function bridgeAsset() {
    const apiReturnData = mutation.data;
    const signer = await provider.getSigner();

    const gasPrice = await signer.getGasPrice();

    const gasEstimate = await provider.estimateGas({
      from: walletAddress,
      to: apiReturnData.result.txTarget,
      value: apiReturnData.result.value,
      data: apiReturnData.result.txData,
      gasPrice: gasPrice,
    });

    const tx = await signer.sendTransaction({
      from: walletAddress,
      to: apiReturnData.result.txTarget,
      data: apiReturnData.result.txData,
      value: apiReturnData.result.value,
      gasPrice: gasPrice,
      gasLimit: gasEstimate,
    });

    // Initiates swap/bridge transaction on user's frontend which user has to sign
    const receipt = await tx.wait();

    const txHash = receipt.transactionHash;

    console.log('Bridging Transaction : ', txHash);
  }

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
      <button onClick={() => connectWallet()}>connect</button>
      <button onClick={() => mutation.mutate(buildTxParams)}>mutate</button>
      <button onClick={() => getApproval()}>getApproval</button>
      <button onClick={() => bridgeAsset()}>bridgeAsset</button>
    </>
  );
}

export default App;
