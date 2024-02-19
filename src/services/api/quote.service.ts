import { api } from '../../lib/api';
import { SuccessResponse } from '../../types/api';

export interface QuoteParams {
  fromChainId: string;
  fromTokenAddress: string;
  toChainId: string;
  toTokenAddress: string;
  fromAmount: string;
  userAddress: string;
  uniqueRoutesPerBridge: boolean;
  sort: string;
  recipient?: string;
  disableSwapping?: boolean;
  includeDexes?: string[];
  includeBridges?: string[];
  singleTxOnly?: boolean;
  isContractCall?: boolean;
  bridgeWithGas?: boolean;
  bridgeWithInsurance?: boolean;
}

export const getQuote = async (params: QuoteParams) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data } = await api.get<SuccessResponse<any>>('/v2/quote', {
    params,
  });
  return data;
};
