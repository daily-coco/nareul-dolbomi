import type { Database } from '@/shared/api/database.types';

export type RecordRow = Database['public']['Tables']['records']['Row'];
export type RecordInsert = Database['public']['Tables']['records']['Insert'];
export type RecordUpdate = Database['public']['Tables']['records']['Update'];

export type CareSubjectRow =
  Database['public']['Tables']['care_subjects']['Row'];

export type RecordCareSubject = Pick<CareSubjectRow, 'id' | 'name'>;

export type RecordListItem = RecordRow & {
  care_subjects: RecordCareSubject | null;
};

export type CreateRecordInput = {
  careSubjectId: string;
  title: string;
  content: string;
  recordDate: string;
};

export type UpdateRecordInput = CreateRecordInput & {
  id: string;
};
