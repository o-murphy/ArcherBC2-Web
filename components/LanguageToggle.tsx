import { useState } from "react";
import { ToolTipIconButton } from "./IconButtonWithTooltip";
import { useTranslation } from "react-i18next";
import CountryFlag from "react-native-country-flag";


export const LanguageToggle = ({ style }: { style?: any }) => {
    const { i18n, t } = useTranslation();
    const [currentLang, setCurrentLang] = useState<"en" | "ua">(() =>
        i18n.language === "ua" ? "ua" : "en",
    );

    const toggleLanguage = async () => {
        const newLang = currentLang === "en" ? "ua" : "en";
        await i18n.changeLanguage(newLang);
        setCurrentLang(newLang);
    };

    return (
        <ToolTipIconButton
            tooltip={t(
                `languageToggle.SwitchTo_${currentLang === "en" ? "ua" : "en"}`,
            )}
            // icon={md3PaperIconSource({ name: "translate" })}
            icon={(props) => (
                <CountryFlag
                    size={16}
                    isoCode={currentLang === "en" ? "ua" : "us"}
                />
            )}
            onPress={toggleLanguage}
            style={style}
        />
    );
};
