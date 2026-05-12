import { supabase } from '@/shared/api/supabaseClient';
import type { CareSubject, CareSubjectId } from '../model/careSubject.types';
import type { CareSubjectFormValues } from '../model/careSubject.schemas';

const CARE_SUBJECTS_TABLE = 'care_subjects' as const;

const careSubjectSelectColumns = `
  id,
  user_id,
  name,
  description,
  created_at,
  updated_at
`;

const getCurrentUserId = async (): Promise<string> => {
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    throw new Error(error.message);
  }

  if (!data.user) {
    throw new Error('로그인이 필요합니다.');
  }

  return data.user.id;
};

const normalizeDescription = (description?: string): string | null => {
  const trimmedDescription = description?.trim();

  if (!trimmedDescription) {
    return null;
  }

  return trimmedDescription;
};

export const getCareSubjects = async (): Promise<CareSubject[]> => {
  const userId = await getCurrentUserId();

  const { data, error } = await supabase
    .from(CARE_SUBJECTS_TABLE)
    .select(careSubjectSelectColumns)
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
};

export const createCareSubject = async (
  values: CareSubjectFormValues
): Promise<CareSubject> => {
  const userId = await getCurrentUserId();

  const payload = {
    user_id: userId,
    name: values.name.trim(),
    description: normalizeDescription(values.description),
  };

  const { data, error } = await supabase
    .from(CARE_SUBJECTS_TABLE)
    .insert(payload)
    .select(careSubjectSelectColumns)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const updateCareSubject = async ({
  id,
  values,
}: {
  id: CareSubjectId;
  values: CareSubjectFormValues;
}): Promise<CareSubject> => {
  const userId = await getCurrentUserId();

  const payload = {
    name: values.name.trim(),
    description: normalizeDescription(values.description),
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from(CARE_SUBJECTS_TABLE)
    .update(payload)
    .eq('id', id)
    .eq('user_id', userId)
    .select(careSubjectSelectColumns)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const deleteCareSubject = async (
  id: CareSubjectId
): Promise<CareSubjectId> => {
  const userId = await getCurrentUserId();

  const { data, error } = await supabase
    .from(CARE_SUBJECTS_TABLE)
    .delete()
    .eq('id', id)
    .eq('user_id', userId)
    .select('id')
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data.id;
};
