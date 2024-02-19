import { api } from '../../lib/api';
import { SuccessResponse } from '../../types/api';

export interface ApprovalTransactionDataParams {
  chainID: string;
  owner: string;
  allowanceTarget: string;
  tokenAddress: string;
  amount: string;
}

export const getApprovalTransactionData = async (
  params: ApprovalTransactionDataParams
) => {
  const { data } = await api.get<SuccessResponse<unknown>>(
    '/v2/approval/build-tx',
    {
      params,
    }
  );
  return data;
};
