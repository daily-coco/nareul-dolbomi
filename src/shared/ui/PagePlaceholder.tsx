import * as styles from './PagePlaceholder.css.ts';

interface PagePlaceholderProps {
  title: string;
  description: string;
}

export const PagePlaceholder = ({
  title,
  description,
}: PagePlaceholderProps) => {
  return (
    <section className={styles.wrapper}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.description}>{description}</p>
    </section>
  );
};
