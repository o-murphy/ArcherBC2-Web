import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
    const { i18n } = useTranslation();

    const changeLanguage = async (lang: "en" | "ua") => {
        await i18n.changeLanguage(lang);
    };

    return (
        <div className="mt-4 space-x-2">
            <button
                onClick={() => changeLanguage("en")}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                EN
            </button>

            <button
                onClick={() => changeLanguage("ua")}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                UA
            </button>
        </div>
    );
}
