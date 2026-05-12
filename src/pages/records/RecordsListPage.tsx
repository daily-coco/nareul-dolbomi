// src/pages/records/RecordsListPage.tsx

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCareSubjectsQuery } from '@/features/care-subjects/api/careSubject.queries';
import {
  useDeleteRecordMutation,
  useRecordsQuery,
  useUpdateRecordMutation,
} from '@/features/records/api/record.queries';
import type { RecordFormValues } from '@/features/records/model/record.schemas';
import type { RecordListItem } from '@/features/records/model/record.types';
import { RecordForm } from '@/features/records/ui/RecordForm';
import { RecordList } from '@/features/records/ui/RecordList';
import * as styles from '@/features/records/ui/RecordsPage.css';

export function RecordsListPage() {
  const [editingRecord, setEditingRecord] = useState<RecordListItem | null>(
    null
  );
  const [deletingRecordId, setDeletingRecordId] = useState<string | null>(null);

  const {
    data: records = [],
    isLoading: isRecordsLoading,
    isError: isRecordsError,
    error: recordsError,
  } = useRecordsQuery();

  const {
    data: careSubjects = [],
    isLoading: isCareSubjectsLoading,
    isError: isCareSubjectsError,
    error: careSubjectsError,
  } = useCareSubjectsQuery();

  const updateRecordMutation = useUpdateRecordMutation();
  const deleteRecordMutation = useDeleteRecordMutation();

  const handleEdit = (record: RecordListItem) => {
    setEditingRecord(record);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdate = async (values: RecordFormValues) => {
    if (!editingRecord) {
      return;
    }

    await updateRecordMutation.mutateAsync({
      id: editingRecord.id,
      ...values,
    });

    setEditingRecord(null);
  };

  const handleDelete = async (recordId: string) => {
    const confirmed = window.confirm('이 기록을 삭제할까요?');

    if (!confirmed) {
      return;
    }

    setDeletingRecordId(recordId);

    try {
      await deleteRecordMutation.mutateAsync(recordId);

      if (editingRecord?.id === recordId) {
        setEditingRecord(null);
      }
    } finally {
      setDeletingRecordId(null);
    }
  };

  const isLoading = isRecordsLoading || isCareSubjectsLoading;

  return (
    <main className={styles.page}>
      <div className={styles.header}>
        <div className={styles.headerText}>
          <h1 className={styles.title}>기록 목록</h1>
          <p className={styles.description}>
            내가 작성한 기록만 조회됩니다. 기록은 선택한 기록 대상과 연결됩니다.
          </p>
        </div>

        <Link className={styles.linkButton} to='/records/new'>
          기록 작성
        </Link>
      </div>

      {isLoading ? (
        <div className={styles.notice}>기록 정보를 불러오는 중입니다.</div>
      ) : null}

      {isRecordsError ? (
        <div className={styles.notice}>
          기록 목록을 불러오지 못했습니다.
          <br />
          {recordsError instanceof Error
            ? recordsError.message
            : '알 수 없는 오류가 발생했습니다.'}
        </div>
      ) : null}

      {isCareSubjectsError ? (
        <div className={styles.notice}>
          기록 대상 목록을 불러오지 못했습니다.
          <br />
          {careSubjectsError instanceof Error
            ? careSubjectsError.message
            : '알 수 없는 오류가 발생했습니다.'}
        </div>
      ) : null}

      {editingRecord ? (
        <section className={styles.editPanel}>
          <h2 className={styles.sectionTitle}>기록 수정</h2>

          <div className={styles.card}>
            <RecordForm
              careSubjects={careSubjects}
              submitLabel='수정 저장'
              isSubmitting={updateRecordMutation.isPending}
              defaultValues={{
                careSubjectId: editingRecord.care_subject_id,
                title: editingRecord.title,
                content: editingRecord.content,
                recordDate: editingRecord.record_date,
              }}
              onCancel={() => setEditingRecord(null)}
              onSubmit={handleUpdate}
            />

            {updateRecordMutation.isError ? (
              <p className={styles.errorText}>
                {updateRecordMutation.error instanceof Error
                  ? updateRecordMutation.error.message
                  : '기록 수정 중 오류가 발생했습니다.'}
              </p>
            ) : null}
          </div>
        </section>
      ) : null}

      {!isLoading && !isRecordsError ? (
        <RecordList
          records={records}
          deletingRecordId={deletingRecordId}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ) : null}

      {deleteRecordMutation.isError ? (
        <p className={styles.errorText}>
          {deleteRecordMutation.error instanceof Error
            ? deleteRecordMutation.error.message
            : '기록 삭제 중 오류가 발생했습니다.'}
        </p>
      ) : null}
    </main>
  );
}
