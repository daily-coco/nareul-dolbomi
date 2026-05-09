import { useUiSettingsStore } from '@/shared/stores/useUiSettingsStore';
import { PagePlaceholder } from '@/shared/ui/PagePlaceholder';

export const SettingsPage = () => {
  const fontSize = useUiSettingsStore((state) => state.fontSize);
  const setFontSize = useUiSettingsStore((state) => state.setFontSize);

  return (
    <section>
      <PagePlaceholder
        title='설정'
        description='폰트 크기처럼 민감하지 않은 UI 옵션만 브라우저에 저장합니다.'
      />

      <div style={{ marginTop: '1rem' }}>
        <p>현재 폰트 크기: {fontSize}</p>

        <button type='button' onClick={() => setFontSize('small')}>
          작게
        </button>
        <button type='button' onClick={() => setFontSize('medium')}>
          보통
        </button>
        <button type='button' onClick={() => setFontSize('large')}>
          크게
        </button>
      </div>
    </section>
  );
};
