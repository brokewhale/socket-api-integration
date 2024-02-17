import { useQuery } from '@tanstack/react-query';
import {
  FromTokenListParams,
  getFromTokenList,
} from '../api/fromTokenList.service';

export const useGetFromTokenList = (params: FromTokenListParams) => {
  const res = useQuery({
    queryKey: ['fromQueryList', { params }],
    queryFn: () => getFromTokenList(params),
  });
  return res;
};
