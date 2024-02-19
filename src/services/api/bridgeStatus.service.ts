import { api } from '../../lib/api';
import { SuccessResponse } from '../../types/api';

export interface BridgeStatusParams {
  transactionHash: string;
  fromChainId: string;
  toChainId: string;
}

export const getBridgeStatus = async (params: BridgeStatusParams) => {
  const { data } = await api.get<SuccessResponse<unknown>>(
    '/v2/bridge-status',
    {
      params,
    }
  );
  return data;
};
