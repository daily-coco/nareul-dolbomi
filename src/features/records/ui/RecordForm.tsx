// src/features/records/ui/RecordForm.tsx

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { recordSchema, type RecordFormValues } from '../model/record.schemas';
import * as styles from './RecordsPage.css';

type CareSubjectOption = {
  id: string;
  name: string;
};

type RecordFormProps = {
  careSubjects: CareSubjectOption[];
  defaultValues?: Partial<RecordFormValues>;
  submitLabel?: string;
  isSubmitting?: boolean;
  onCancel?: () => void;
  onSubmit: (values: RecordFormValues) => void | Promise<void>;
};

function getTodayDateValue() {
  return new Date().toISOString().slice(0, 10);
}

export function RecordForm({
  careSubjects,
  defaultValues,
  submitLabel = '저장',
  isSubmitting = false,
  onCancel,
  onSubmit,
}: RecordFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RecordFormValues>({
    resolver: zodResolver(recordSchema),
    defaultValues: {
      careSubjectId: defaultValues?.careSubjectId ?? '',
      title: defaultValues?.title ?? '',
      content: defaultValues?.content ?? '',
      recordDate: defaultValues?.recordDate ?? getTodayDateValue(),
    },
  });

  useEffect(() => {
    reset({
      careSubjectId: defaultValues?.careSubjectId ?? '',
      title: defaultValues?.title ?? '',
      content: defaultValues?.content ?? '',
      recordDate: defaultValues?.recordDate ?? getTodayDateValue(),
    });
  }, [defaultValues, reset]);

  const isCareSubjectEmpty = careSubjects.length === 0;

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.field}>
        <label className={styles.label} htmlFor='careSubjectId'>
          기록 대상
        </label>

        <select
          id='careSubjectId'
          className={styles.select}
          disabled={isSubmitting || isCareSubjectEmpty}
          {...register('careSubjectId')}
        >
          <option value=''>
            {isCareSubjectEmpty
              ? '먼저 기록 대상을 만들어주세요'
              : '기록 대상을 선택해주세요'}
          </option>

          {careSubjects.map((careSubject) => (
            <option key={careSubject.id} value={careSubject.id}>
              {careSubject.name}
            </option>
          ))}
        </select>

        {errors.careSubjectId ? (
          <p className={styles.errorText}>{errors.careSubjectId.message}</p>
        ) : null}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor='recordDate'>
          기록 날짜
        </label>

        <input
          id='recordDate'
          type='date'
          className={styles.input}
          disabled={isSubmitting}
          {...register('recordDate')}
        />

        {errors.recordDate ? (
          <p className={styles.errorText}>{errors.recordDate.message}</p>
        ) : null}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor='title'>
          제목
        </label>

        <input
          id='title'
          type='text'
          className={styles.input}
          placeholder='예: 오늘 컨디션 기록'
          disabled={isSubmitting}
          {...register('title')}
        />

        {errors.title ? (
          <p className={styles.errorText}>{errors.title.message}</p>
        ) : null}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor='content'>
          기록 내용
        </label>

        <textarea
          id='content'
          className={styles.textarea}
          placeholder='오늘의 상태, 특이사항, 메모 등을 적어주세요.'
          disabled={isSubmitting}
          {...register('content')}
        />

        {errors.content ? (
          <p className={styles.errorText}>{errors.content.message}</p>
        ) : null}
      </div>

      <div className={styles.buttonRow}>
        {onCancel ? (
          <button
            type='button'
            className={styles.secondaryButton}
            onClick={onCancel}
            disabled={isSubmitting}
          >
            취소
          </button>
        ) : null}

        <button
          type='submit'
          className={styles.primaryButton}
          disabled={isSubmitting || isCareSubjectEmpty}
        >
          {isSubmitting ? '저장 중...' : submitLabel}
        </button>
      </div>
    </form>
  );
}
