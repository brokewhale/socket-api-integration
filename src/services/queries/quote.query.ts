import { useQuery } from '@tanstack/react-query';
import { QuoteParams, getQuote } from '../api/quote.service';

export const useGetQuote = (params: QuoteParams) => {
  const res = useQuery({
    queryKey: ['quote', { params }],
    queryFn: () => getQuote(params),
  });
  return res;
};
