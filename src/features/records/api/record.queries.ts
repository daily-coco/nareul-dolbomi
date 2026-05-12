import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createRecord,
  deleteRecord,
  getRecordById,
  getRecords,
  updateRecord,
} from './record.api';
import type {
  CreateRecordInput,
  UpdateRecordInput,
} from '../model/record.types';

export const recordQueryKeys = {
  all: ['records'] as const,
  list: () => [...recordQueryKeys.all, 'list'] as const,
  detail: (recordId: string) =>
    [...recordQueryKeys.all, 'detail', recordId] as const,
};

export function useRecordsQuery() {
  return useQuery({
    queryKey: recordQueryKeys.list(),
    queryFn: getRecords,
  });
}

export function useRecordDetailQuery(recordId?: string) {
  return useQuery({
    queryKey: recordId
      ? recordQueryKeys.detail(recordId)
      : [...recordQueryKeys.all, 'detail', 'empty'],
    queryFn: () => {
      if (!recordId) {
        throw new Error('recordId가 없습니다.');
      }

      return getRecordById(recordId);
    },
    enabled: Boolean(recordId),
  });
}

export function useCreateRecordMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateRecordInput) => createRecord(input),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: recordQueryKeys.list(),
      });
    },
  });
}

export function useUpdateRecordMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: UpdateRecordInput) => updateRecord(input),
    onSuccess: async (updatedRecord) => {
      await queryClient.invalidateQueries({
        queryKey: recordQueryKeys.list(),
      });

      await queryClient.invalidateQueries({
        queryKey: recordQueryKeys.detail(updatedRecord.id),
      });
    },
  });
}

export function useDeleteRecordMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (recordId: string) => deleteRecord(recordId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: recordQueryKeys.list(),
      });
    },
  });
}
