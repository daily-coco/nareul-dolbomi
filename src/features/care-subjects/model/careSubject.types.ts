export type CareSubject = {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  created_at: string;
  updated_at: string | null;
};

export type CareSubjectId = CareSubject['id'];
