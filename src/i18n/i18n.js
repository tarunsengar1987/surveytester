// import i18n from "i18next";
// import { initReactI18next } from "react-i18next";
// import Backend from "i18next-xhr-backend";
// import LanguageDetector from "i18next-browser-languagedetector";

// i18n
//     .use(Backend)
//     .use(LanguageDetector)
//     .use(initReactI18next)
//     .init({
//         lng: localStorage.getItem('lang') || "en",
//         backend: {
//             /* translation file path */
//             loadPath: "/assets/i18n/{{lng}}.json",
//         },
//         fallbackLng: "en",
//         debug: false,
//         /* can have multiple namespace, in case you want to divide a huge translation into smaller pieces and load them on demand */
//         ns: ["translations"],
//         defaultNS: "translations",
//         keySeparator: ".",
//         interpolation: {
//             escapeValue: false,
//             formatSeparator: ",",
//         },
//         react: {
//             useSuspense: true,
//         },
//     });

// export default i18n;


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
    // .use(Backend) // load translation using xhr -> see /public/locales. We will add locales in the next step
    .use(LanguageDetector) // detect user language
    .use(initReactI18next) // pass the i18n instance to react-i18next.
    .init({
        // fallbackLng:"en", // if user computer language is not on the list of available languages, than we will be using the fallback language specified earlier
        // debug: true,
        // whitelist: Languages,
        resources,
        lng: "en",
        interpolation: {
            escapeValue: false,
        },
        keySeparator: ".",
    });
export default i18n;