import { api } from '../../lib/api';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const buildTx = async (data: any) => {
  const { data: resData } = await api.post('/v2/build-tx', data);
  return resData;
};
