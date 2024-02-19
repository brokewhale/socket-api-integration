import { useQuery } from '@tanstack/react-query';
import { ToTokenListParams, getToTokenList } from '../api/toTokenList.service';

export const useGetToTokenList = (params: ToTokenListParams) => {
  const res = useQuery({
    queryKey: ['toQueryList', { params }],
    queryFn: () => getToTokenList(params),
  });
  return res;
};
