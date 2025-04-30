import { useThemeToggle } from "@/hooks/useThemeToggle";
import { md3PaperIconSource } from "../icons/MD3PaperIcons";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { FileMenu } from "./FileMenu";
import { Appbar, Text } from "react-native-paper";
import CountryFlag from "react-native-country-flag";
import { HelpButton } from "../contentCards/help/HelpIcons";
import { useHelp } from "../contentCards/help/helpContent";
import { View } from "react-native";

export const TopBar = ({ title, helpContentKey }: { title: string, helpContentKey: string }) => {
    const { theme, toggleTheme } = useThemeToggle();
    const helpContent = useHelp();
    const themeIcon = md3PaperIconSource({
        name: theme.dark ? "dark-mode" : "light-mode",
    });

    const { i18n } = useTranslation();
    const [currentLang, setCurrentLang] = useState<"en" | "ua">(() =>
        i18n.language === "ua" ? "ua" : "en",
    );

    const toggleLanguage = async () => {
        const newLang = currentLang === "en" ? "ua" : "en";
        await i18n.changeLanguage(newLang);
        setCurrentLang(newLang);
    };
    console.log("T", title)
    return (
        <Appbar.Header>
            <FileMenu />
            <Appbar.Content
                title={
                    <View style={{ flexDirection: "row", gap: 8 }}>
                        <Text variant="titleLarge">{title}</Text>
                        <HelpButton
                            helpContent={helpContent?.[helpContentKey]}
                        ></HelpButton>
                    </View>
                }
            />

            <Appbar.Action
                icon={themeIcon}
                onPress={toggleTheme}
                animated={false}
            />
            <Appbar.Action
                icon={(props) => (
                    <CountryFlag
                        size={16}
                        isoCode={currentLang === "en" ? "ua" : "us"}
                    />
                )}
                onPress={toggleLanguage}
                animated={false}
            />
        </Appbar.Header>
    );
};
