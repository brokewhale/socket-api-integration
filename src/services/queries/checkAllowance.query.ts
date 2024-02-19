import { useQuery } from '@tanstack/react-query';
import {
  CheckAllowanceParams,
  checkAllowance,
} from '../api/checkAllowance.service';

export const useCheckAllowance = (params: CheckAllowanceParams) => {
  const res = useQuery({
    queryKey: ['checkAllowance', { params }],
    queryFn: () => checkAllowance(params),
    enabled: false,
  });
  return res;
};
