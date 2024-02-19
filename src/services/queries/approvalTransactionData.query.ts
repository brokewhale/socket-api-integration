import { useQuery } from '@tanstack/react-query';
import {
  ApprovalTransactionDataParams,
  getApprovalTransactionData,
} from '../api/approvalTransactionData.service';

export const useGetApprovalTransactionData = (
  params: ApprovalTransactionDataParams
) => {
  const res = useQuery({
    queryKey: ['approvalTransactionData', { params }],
    queryFn: () => getApprovalTransactionData(params),
  });
  return res;
};
