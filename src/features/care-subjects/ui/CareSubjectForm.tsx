import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import {
  careSubjectFormSchema,
  type CareSubjectFormValues,
} from '../model/careSubject.schemas.ts';
import * as styles from './CareSubjectsPage.css.ts';

type CareSubjectFormProps = {
  mode: 'create' | 'edit';
  initialValues?: CareSubjectFormValues;
  isSubmitting: boolean;
  onSubmit: (values: CareSubjectFormValues) => Promise<void> | void;
  onCancel?: () => void;
};

const defaultValues: CareSubjectFormValues = {
  name: '',
  description: '',
};
export const CareSubjectForm = ({
  mode,
  initialValues,
  isSubmitting,
  onSubmit,
  onCancel,
}: CareSubjectFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CareSubjectFormValues>({
    resolver: zodResolver(careSubjectFormSchema),
    defaultValues: initialValues ?? defaultValues,
  });
  useEffect(() => {
    reset(initialValues ?? defaultValues);
  }, [initialValues, reset]);

  const handleValidSubmit: SubmitHandler<CareSubjectFormValues> = async (
    values
  ) => {
    await onSubmit(values);

    if (mode === 'create') {
      reset(defaultValues);
    }
  };
  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit(handleValidSubmit)}
      noValidate
    >
      <div className={styles.field}>
        <label className={styles.label} htmlFor='care-subject-name'>
          기록 대상 이름
        </label>
        <input
          id='care-subject-name'
          className={styles.input}
          type='text'
          placeholder='예: 나, 반려묘 코코, 어머니'
          autoComplete='off'
          disabled={isSubmitting}
          {...register('name')}
        />
        {errors.name ? (
          <p className={styles.fieldError}>{errors.name.message}</p>
        ) : null}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor='care-subject-description'>
          설명
        </label>
        <textarea
          id='care-subject-description'
          className={styles.textarea}
          placeholder='기록 대상에 대한 간단한 설명을 입력해 주세요.'
          disabled={isSubmitting}
          {...register('description')}
        />
        {errors.description ? (
          <p className={styles.fieldError}>{errors.description.message}</p>
        ) : null}
      </div>

      <div className={styles.buttonGroup}>
        <button
          className={styles.primaryButton}
          type='submit'
          disabled={isSubmitting}
        >
          {mode === 'create' ? '대상 추가' : '수정 완료'}
        </button>

        {mode === 'edit' && onCancel ? (
          <button
            className={styles.secondaryButton}
            type='button'
            onClick={onCancel}
            disabled={isSubmitting}
          >
            수정 취소
          </button>
        ) : null}
      </div>
    </form>
  );
};
