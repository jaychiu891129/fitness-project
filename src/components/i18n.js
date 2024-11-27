import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          settingsPageTitle: "Settings Page",
          username: "Username",
          language: "Language",
          notifications: "Notifications",
          saveSettings: "Save Settings",
          returnHome: "Return Home",
        },
      },
      zh: {
        translation: {
          settingsPageTitle: "設定頁面",
          username: "用戶名稱",
          language: "語言",
          notifications: "通知",
          saveSettings: "儲存設定",
          returnHome: "返回首頁",
        },
      },
    },
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
