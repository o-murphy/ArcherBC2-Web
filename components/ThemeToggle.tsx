import { useThemeToggle } from "@/hooks/useThemeToggle";
import { useTheme } from "react-native-paper";
import { md3PaperIconSource } from "./icons/MD3PaperIcons";
import { ToolTipIconButton } from "./IconButtonWithTooltip";
import { useTranslation } from "react-i18next";

export const ThemeToggle = () => {
    const theme = useTheme();
    const { toggleTheme } = useThemeToggle();
    const { t } = useTranslation();
    const themeIcon = md3PaperIconSource({
        name: theme.dark ? "dark-mode" : "light-mode",
    });

    return (
        <ToolTipIconButton
            tooltip={t("themeToggle.ToggleTheme")}
            icon={themeIcon}
            onPress={toggleTheme}
        />
    );
};
