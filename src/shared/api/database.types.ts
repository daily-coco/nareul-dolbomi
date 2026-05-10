export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type AppRole = 'user' | 'admin';
export type CareSubjectType = 'self' | 'family' | 'pet' | 'other';

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          display_name: string | null;
          role: AppRole;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          display_name?: string | null;
          role?: AppRole;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          display_name?: string | null;
          role?: AppRole;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      care_subjects: {
        Row: {
          id: string;
          user_id: string;
          type: CareSubjectType;
          name: string;
          birth_date: string | null;
          note: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          type?: CareSubjectType;
          name: string;
          birth_date?: string | null;
          note?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          type?: CareSubjectType;
          name?: string;
          birth_date?: string | null;
          note?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      records: {
        Row: {
          id: string;
          user_id: string;
          care_subject_id: string | null;
          title: string | null;
          content: string;
          recorded_at: string;
          tags: string[];
          has_attachments: boolean;
          created_at: string;
          updated_at: string;
          deleted_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          care_subject_id?: string | null;
          title?: string | null;
          content: string;
          recorded_at?: string;
          tags?: string[];
          has_attachments?: boolean;
          created_at?: string;
          updated_at?: string;
          deleted_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          care_subject_id?: string | null;
          title?: string | null;
          content?: string;
          recorded_at?: string;
          tags?: string[];
          has_attachments?: boolean;
          created_at?: string;
          updated_at?: string;
          deleted_at?: string | null;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      app_role: AppRole;
      care_subject_type: CareSubjectType;
    };
    CompositeTypes: Record<string, never>;
  };
}
