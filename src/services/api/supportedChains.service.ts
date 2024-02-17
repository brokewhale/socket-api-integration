import { api } from '../../lib/api';
import { SuccessResponse } from '../../types/api';

export const getSupportedChains = async () => {
  const { data } = await api.get<SuccessResponse<unknown>>(
    '/v2/supported/chains'
  );
  return data;
};
