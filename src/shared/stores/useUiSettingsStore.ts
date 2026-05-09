import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type FontSize = 'small' | 'medium' | 'large';

interface UiSettingsState {
  fontSize: FontSize;
  setFontSize: (fontSize: FontSize) => void;
}

export const useUiSettingsStore = create<UiSettingsState>()(
  persist(
    (set) => ({
      fontSize: 'medium',
      setFontSize: (fontSize) => set({ fontSize }),
    }),
    {
      name: 'record-web-app-ui-settings',
      /**
       * 여기에 저장해도 되는 것:
       * - 폰트 크기
       * - 테마
       * - 사이드바 접힘 여부
       *
       * 저장하면 안 되는 것:
       * - 기록 본문
       * - 사진 URL
       * - PDF URL
       * - 사용자 개인정보
       * - 권한 정보
       * - access token
       */
      partialize: (state) => ({
        fontSize: state.fontSize,
      }),
    }
  )
);
