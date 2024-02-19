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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data } = await api.get<SuccessResponse<any>>(
    '/v2/approval/build-tx',
    {
      params,
    }
  );
  return data;
};
