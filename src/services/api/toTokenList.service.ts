import { api } from '../../lib/api';
import { SuccessResponse } from '../../types/api';

export interface ToTokenListParams {
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

export const getToTokenList = async (params: ToTokenListParams) => {
  const { data } = await api.get<SuccessResponse<unknown>>(
    '/v2/token-lists/to-token-list',
    {
      params,
    }
  );
  return data;
};
