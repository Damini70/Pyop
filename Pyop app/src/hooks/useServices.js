import { useQuery, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from '../services/generalFunctions';

// Custom hook for fetching services with React Query
export const useServices = (banner, options = {}) => {
  return useQuery({
    queryKey: ['services', banner],
    queryFn: async () => {
      if (banner === 'birthday') {
        const res = await makeRequest('get', 'vendor/service/birthday');
        if (res?.status) {
          return res.birthdayServices;
        }
      }
      
      if (banner === 'wedding') {
        const res = await makeRequest('get', 'vendor/service/wedding');
        if (res?.status) {
          return res.weddingServices;
        }
      }
      
      return [];
    },
    enabled: !!banner, // Only run query if banner is provided
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    cacheTime: 10 * 60 * 1000, // Keep in cache for 10 minutes
    retry: 3, // Retry failed requests 3 times
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
    ...options, // Allow overriding default options
  });
};

// Hook for refetching services
export const useRefetchServices = () => {
  const queryClient = useQueryClient();
  
  const refetchServices = (banner) => {
    return queryClient.invalidateQueries(['services', banner]);
  };
  
  return refetchServices;
};