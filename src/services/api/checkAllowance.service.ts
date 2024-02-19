import { api } from '../../lib/api';
import { SuccessResponse } from '../../types/api';

export interface CheckAllowanceParams {
  chainID: string;
  owner: string;
  allowanceTarget: string;
  tokenAddress: string;
}

export const checkAllowance = async (params: CheckAllowanceParams) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data } = await api.get<SuccessResponse<any>>(
    '/v2/approval/check-allowance',
    {
      params,
    }
  );
  return data;
};
