import { api } from '../../lib/api';
import { SuccessResponse } from '../../types/api';

export interface FromTokenListParams {
  fromChainId: string;
  toChainId: string;
  disableSwapping?: boolean;
  includeDexes?: string[];
  excludeDexes?: string[];
  includeBridges?: string[];
  excludeBridges?: string[];
  singleTxOnly?: boolean;
  isShortList?: boolean;
}

export const getFromTokenList = async (params: FromTokenListParams) => {
  const { data } = await api.get<SuccessResponse<unknown>>(
    '/v2/token-lists/from-token-list',
    {
      params,
    }
  );
  return data;
};
