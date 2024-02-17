import { useQuery } from '@tanstack/react-query';
import { getSupportedChains } from '../api/supportedChains.service';

export const useGetSupportedChains = () => {
  const res = useQuery({
    queryKey: ['supportedChains'],
    queryFn: getSupportedChains,
  });
  return res;
};
