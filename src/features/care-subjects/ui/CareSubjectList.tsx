import type { CareSubject } from '../model/careSubject.types.ts';
import * as styles from './CareSubjectsPage.css.ts';

type CareSubjectListProps = {
  careSubjects: CareSubject[];
  deletingId: string | null;
  onEdit: (careSubject: CareSubject) => void;
  onDelete: (careSubject: CareSubject) => void;
};

const formatDate = (date: string): string => {
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date(date));
};

export const CareSubjectList = ({
  careSubjects,
  deletingId,
  onEdit,
  onDelete,
}: CareSubjectListProps) => {
  if (careSubjects.length === 0) {
    return (
      <div className={styles.empty}>
        아직 등록된 기록 대상이 없습니다.
        <br />
        먼저 기록 대상을 추가해 주세요.
      </div>
    );
  }

  return (
    <div className={styles.list}>
      {careSubjects.map((careSubject) => {
        const isDeleting = deletingId === careSubject.id;

        return (
          <article className={styles.listItem} key={careSubject.id}>
            <div className={styles.listItemHeader}>
              <div>
                <h3 className={styles.listItemTitle}>{careSubject.name}</h3>
                <p className={styles.listItemMeta}>
                  생성일: {formatDate(careSubject.created_at)}
                </p>
              </div>

              <div className={styles.buttonGroup}>
                <button
                  className={styles.secondaryButton}
                  type='button'
                  onClick={() => onEdit(careSubject)}
                  disabled={isDeleting}
                >
                  수정
                </button>
                <button
                  className={styles.dangerButton}
                  type='button'
                  onClick={() => onDelete(careSubject)}
                  disabled={isDeleting}
                >
                  {isDeleting ? '삭제 중' : '삭제'}
                </button>
              </div>
            </div>

            {careSubject.description ? (
              <p className={styles.listItemDescription}>
                {careSubject.description}
              </p>
            ) : null}
          </article>
        );
      })}
    </div>
  );
};
