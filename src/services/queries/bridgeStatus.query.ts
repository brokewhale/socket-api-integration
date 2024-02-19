import { useQuery } from '@tanstack/react-query';
import {
  BridgeStatusParams,
  getBridgeStatus,
} from '../api/bridgeStatus.service';

export const useGetBridgeStatus = (params: BridgeStatusParams) => {
  const res = useQuery({
    queryKey: ['getBridgeStatus', { params }],
    queryFn: () => getBridgeStatus(params),
  });
  return res;
};
