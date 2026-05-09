export type RecordVisibility = 'private' | 'shared';

export interface RecordRow {
  id: string;
  user_id: string;
  care_subject_id: string | null;
  title: string;
  content: string;
  visibility: RecordVisibility;
  recorded_at: string;
  created_at: string;
  updated_at: string;
}

export interface RecordListItem {
  id: string;
  title: string;
  recordedAt: string;
  createdAt: string;
}

export interface RecordDetail {
  id: string;
  title: string;
  content: string;
  recordedAt: string;
  createdAt: string;
  updatedAt: string;
}
