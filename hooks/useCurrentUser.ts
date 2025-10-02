import { useMutation } from '@tanstack/react-query';
import { getUser } from '@/sanityTemp/actions/getUser';

export const useCurrentUser = () => {
  const mutation = useMutation({
    mutationFn: getUser,
    onSuccess: (data) => {
      console.log('Fetched user:', data);
    },
    onError: (error) => {
      console.error('Error fetching current user:', error);
    },
  });

  return mutation;
};