import { useState } from 'react';
import {
  useCareSubjectsQuery,
  useCreateCareSubjectMutation,
  useDeleteCareSubjectMutation,
  useUpdateCareSubjectMutation,
} from '@/features/care-subjects/api/careSubject.queries';
import type { CareSubject } from '@/features/care-subjects/model/careSubject.types';
import type { CareSubjectFormValues } from '@/features/care-subjects/model/careSubject.schemas';
import { CareSubjectForm } from '@/features/care-subjects/ui/CareSubjectForm';
import { CareSubjectList } from '@/features/care-subjects/ui/CareSubjectList';
import * as styles from '@/features/care-subjects/ui/CareSubjectsPage.css.ts';

const getErrorMessage = (error: unknown): string | null => {
  if (error instanceof Error) {
    return error.message;
  }

  return null;
};

export const CareSubjectsPage = () => {
  const [editingCareSubject, setEditingCareSubject] =
    useState<CareSubject | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const careSubjectsQuery = useCareSubjectsQuery();
  const createCareSubjectMutation = useCreateCareSubjectMutation();
  const updateCareSubjectMutation = useUpdateCareSubjectMutation();
  const deleteCareSubjectMutation = useDeleteCareSubjectMutation();

  const careSubjects = careSubjectsQuery.data ?? [];

  const isSubmitting =
    createCareSubjectMutation.isPending || updateCareSubjectMutation.isPending;

  const errorMessage =
    getErrorMessage(careSubjectsQuery.error) ??
    getErrorMessage(createCareSubjectMutation.error) ??
    getErrorMessage(updateCareSubjectMutation.error) ??
    getErrorMessage(deleteCareSubjectMutation.error);

  const handleSubmit = async (values: CareSubjectFormValues) => {
    if (editingCareSubject) {
      await updateCareSubjectMutation.mutateAsync({
        id: editingCareSubject.id,
        values,
      });

      setEditingCareSubject(null);
      return;
    }

    await createCareSubjectMutation.mutateAsync(values);
  };
  const handleEdit = (careSubject: CareSubject) => {
    setEditingCareSubject(careSubject);
  };

  const handleDelete = async (careSubject: CareSubject) => {
    const confirmed = window.confirm(
      `"${careSubject.name}" 기록 대상을 삭제할까요?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(careSubject.id);
      await deleteCareSubjectMutation.mutateAsync(careSubject.id);

      if (editingCareSubject?.id === careSubject.id) {
        setEditingCareSubject(null);
      }
    } finally {
      setDeletingId(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingCareSubject(null);
  };

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>기록 대상 관리</h1>
        <p className={styles.description}>
          기록을 작성하기 전에 먼저 기록 대상을 만들어 주세요. 이후 기록은
          선택한 대상에 연결됩니다.
        </p>
      </header>

      {errorMessage ? (
        <div className={styles.errorBox}>{errorMessage}</div>
      ) : null}

      <div className={styles.contentGrid}>
        <section className={styles.panel} aria-labelledby='care-subject-form'>
          <h2 className={styles.panelTitle} id='care-subject-form'>
            {editingCareSubject ? '기록 대상 수정' : '기록 대상 추가'}
          </h2>

          <CareSubjectForm
            mode={editingCareSubject ? 'edit' : 'create'}
            initialValues={
              editingCareSubject
                ? {
                    name: editingCareSubject.name,
                    description: editingCareSubject.description ?? '',
                  }
                : undefined
            }
            isSubmitting={isSubmitting}
            onSubmit={handleSubmit}
            onCancel={editingCareSubject ? handleCancelEdit : undefined}
          />
        </section>

        <section className={styles.panel} aria-labelledby='care-subject-list'>
          <h2 className={styles.panelTitle} id='care-subject-list'>
            내 기록 대상
          </h2>

          {careSubjectsQuery.isLoading ? (
            <p className={styles.statusText}>기록 대상을 불러오는 중입니다.</p>
          ) : (
            <CareSubjectList
              careSubjects={careSubjects}
              deletingId={deletingId}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </section>
      </div>
    </main>
  );
};
