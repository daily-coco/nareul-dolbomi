import type { RecordListItem } from '../model/record.types';
import * as styles from './RecordsPage.css';

type RecordListProps = {
  records: RecordListItem[];
  deletingRecordId?: string | null;
  onEdit: (record: RecordListItem) => void;
  onDelete: (recordId: string) => void;
};

function formatDate(dateValue: string) {
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date(`${dateValue}T00:00:00`));
}

function getPreview(content: string) {
  const trimmedContent = content.trim();

  if (trimmedContent.length <= 160) {
    return trimmedContent;
  }

  return `${trimmedContent.slice(0, 160)}...`;
}

export function RecordList({
  records,
  deletingRecordId,
  onEdit,
  onDelete,
}: RecordListProps) {
  if (records.length === 0) {
    return (
      <div className={styles.empty}>
        아직 작성한 기록이 없습니다.
        <br />첫 기록을 작성해보세요.
      </div>
    );
  }

  return (
    <div className={styles.list}>
      {records.map((record) => {
        const careSubjectName =
          record.care_subjects?.name ?? '알 수 없는 기록 대상';

        const isDeleting = deletingRecordId === record.id;

        return (
          <article key={record.id} className={styles.listItem}>
            <div className={styles.listItemHeader}>
              <div>
                <h2 className={styles.listItemTitle}>{record.title}</h2>
                <div className={styles.meta}>
                  {formatDate(record.record_date)} · {careSubjectName}
                </div>
              </div>

              <div className={styles.itemActions}>
                <button
                  type='button'
                  className={styles.secondaryButton}
                  onClick={() => onEdit(record)}
                  disabled={isDeleting}
                >
                  수정
                </button>

                <button
                  type='button'
                  className={styles.dangerButton}
                  onClick={() => onDelete(record.id)}
                  disabled={isDeleting}
                >
                  {isDeleting ? '삭제 중...' : '삭제'}
                </button>
              </div>
            </div>

            <p className={styles.contentPreview}>
              {getPreview(record.content)}
            </p>
          </article>
        );
      })}
    </div>
  );
}
