import { Link, useNavigate } from 'react-router-dom';
import { useCareSubjectsQuery } from '@/features/care-subjects/api/careSubject.queries';
import { useCreateRecordMutation } from '@/features/records/api/record.queries';
import { RecordForm } from '@/features/records/ui/RecordForm';
import type { RecordFormValues } from '@/features/records/model/record.schemas';
import * as styles from '@/features/records/ui/RecordsPage.css';

export function RecordsCreatePage() {
  const navigate = useNavigate();

  const {
    data: careSubjects = [],
    isLoading: isCareSubjectsLoading,
    isError: isCareSubjectsError,
    error: careSubjectsError,
  } = useCareSubjectsQuery();

  const createRecordMutation = useCreateRecordMutation();

  const handleSubmit = async (values: RecordFormValues) => {
    await createRecordMutation.mutateAsync(values);
    navigate('/records');
  };
  return (
    <main className={styles.page}>
      <div className={styles.header}>
        <div className={styles.headerText}>
          <h1 className={styles.title}>기록 작성</h1>
          <p className={styles.description}>
            기록 대상을 선택하고 오늘의 기록을 작성합니다.
          </p>
        </div>

        <Link className={styles.secondaryButton} to='/records'>
          목록으로
        </Link>
      </div>

      {isCareSubjectsLoading ? (
        <div className={styles.notice}>기록 대상을 불러오는 중입니다.</div>
      ) : null}

      {isCareSubjectsError ? (
        <div className={styles.notice}>
          기록 대상을 불러오지 못했습니다.
          <br />
          {careSubjectsError instanceof Error
            ? careSubjectsError.message
            : '알 수 없는 오류가 발생했습니다.'}
        </div>
      ) : null}

      {!isCareSubjectsLoading && careSubjects.length === 0 ? (
        <div className={styles.notice}>
          기록을 작성하려면 먼저 기록 대상이 필요합니다.
          <br />
          <br />
          <Link className={styles.linkButton} to='/care-subjects'>
            기록 대상 만들기
          </Link>
        </div>
      ) : null}

      {!isCareSubjectsLoading && careSubjects.length > 0 ? (
        <section className={styles.card}>
          <RecordForm
            careSubjects={careSubjects}
            submitLabel='기록 저장'
            isSubmitting={createRecordMutation.isPending}
            onSubmit={handleSubmit}
          />

          {createRecordMutation.isError ? (
            <p className={styles.errorText}>
              {createRecordMutation.error instanceof Error
                ? createRecordMutation.error.message
                : '기록 저장 중 오류가 발생했습니다.'}
            </p>
          ) : null}
        </section>
      ) : null}
    </main>
  );
}
