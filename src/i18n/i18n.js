import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import translationEN from "./en/en.json";
import translationDE from "./de/de.json";
const resources = {
    en: {
        translation: translationEN,
    },
    de: {
        translation: translationDE,
    },
};
i18n
   
    .use(LanguageDetector) // detect user language
    .use(initReactI18next) // pass the i18n instance to react-i18next.
    .init({
       
        resources,
        lng: localStorage.getItem('i18nextLng') || "en",
        interpolation: {
            escapeValue: false,
        },
        keySeparator: ".",
    });
export default i18n;
