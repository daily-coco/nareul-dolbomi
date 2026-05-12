import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createCareSubject,
  deleteCareSubject,
  getCareSubjects,
  updateCareSubject,
} from './careSubject.api';

export const careSubjectQueryKeys = {
  all: ['care-subjects'] as const,
  lists: () => [...careSubjectQueryKeys.all, 'list'] as const,
};

export const useCareSubjectQuery = () => {
  return useQuery({
    queryKey: careSubjectQueryKeys.lists(),
    queryFn: getCareSubjects,
  });
};

export const useCreateCareSubjectMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCareSubject,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: careSubjectQueryKeys.all,
      });
    },
  });
};

export const useUpdateCareSubjectMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCareSubject,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: careSubjectQueryKeys.all,
      });
    },
  });
};

export const useDeleteCareSubjectMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCareSubject,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: careSubjectQueryKeys.all,
      });
    },
  });
};
