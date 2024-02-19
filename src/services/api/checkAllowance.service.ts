import { api } from '../../lib/api';
import { SuccessResponse } from '../../types/api';

export interface CheckAllowanceParams {
  chainID: string;
  owner: string;
  allowanceTarget: string;
  tokenAddress: string;
}

export const checkAllowance = async (params: CheckAllowanceParams) => {
  const { data } = await api.get<SuccessResponse<unknown>>(
    '/v2/approval/check-allowance',
    {
      params,
    }
  );
  return data;
};
