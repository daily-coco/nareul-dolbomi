import { supabase } from '@/shared/api/supabaseClient';
import type {
  CreateRecordInput,
  RecordInsert,
  RecordListItem,
  RecordRow,
  RecordUpdate,
  UpdateRecordInput,
} from '../model/record.types';

const recordSelectQuery = `
  id,
  user_id,
  care_subject_id,
  title,
  content,
  record_date,
  created_at,
  updated_at,
  care_subjects (
    id,
    name
  )
`;

async function getRequiredUserId() {
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    throw new Error(error.message);
  }

  const userId = data.session?.user.id;

  if (!userId) {
    throw new Error('로그인이 필요합니다.');
  }

  return userId;
}

async function assertOwnCareSubject(careSubjectId: string, userId: string) {
  const { data, error } = await supabase
    .from('care_subjects')
    .select('id')
    .eq('id', careSubjectId)
    .eq('user_id', userId)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    throw new Error('선택한 기록 대상에 접근할 수 없습니다.');
  }
}

export async function getRecords() {
  const { data, error } = await supabase
    .from('records')
    .select(recordSelectQuery)
    .order('record_date', { ascending: false })
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as RecordListItem[];
}

export async function getRecordById(recordId: string) {
  const userId = await getRequiredUserId();

  const { data, error } = await supabase
    .from('records')
    .select(recordSelectQuery)
    .eq('id', recordId)
    .eq('user_id', userId)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data as RecordListItem | null;
}

export async function createRecord(input: CreateRecordInput) {
  const userId = await getRequiredUserId();

  await assertOwnCareSubject(input.careSubjectId, userId);

  const payload: RecordInsert = {
    user_id: userId,
    care_subject_id: input.careSubjectId,
    title: input.title.trim(),
    content: input.content.trim(),
    record_date: input.recordDate,
  };

  const { data, error } = await supabase
    .from('records')
    .insert(payload)
    .select(recordSelectQuery)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as RecordListItem;
}

export async function updateRecord(input: UpdateRecordInput) {
  const userId = await getRequiredUserId();

  await assertOwnCareSubject(input.careSubjectId, userId);

  const payload: RecordUpdate = {
    care_subject_id: input.careSubjectId,
    title: input.title.trim(),
    content: input.content.trim(),
    record_date: input.recordDate,
  };

  const { data, error } = await supabase
    .from('records')
    .update(payload)
    .eq('id', input.id)
    .eq('user_id', userId)
    .select(recordSelectQuery)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as RecordListItem;
}

export async function deleteRecord(recordId: RecordRow['id']) {
  const userId = await getRequiredUserId();

  const { error } = await supabase
    .from('records')
    .delete()
    .eq('id', recordId)
    .eq('user_id', userId);

  if (error) {
    throw new Error(error.message);
  }

  return recordId;
}
