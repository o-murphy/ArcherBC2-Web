import { md3PaperIconSource } from "@/components/icons/MD3PaperIcons";
import { help } from "@/components/services/helpService/helpService";
import { ReactNode } from "react";
import { StyleSheet } from "react-native";
import { TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import { Icon, IconButton, TextInput, useTheme } from "react-native-paper";

export const getHelpInputIcon = (helpText: ReactNode) => {
    const theme = useTheme();
    return (
        <TextInput.Icon
            size={16}
            style={{ width: 24, height: 24, padding: 0, margin: 0 }}
            icon={md3PaperIconSource({ name: "help-outline", mode: "outline" })}
            color={theme.colors.onTertiaryContainer}
            onPress={() => help.show(helpText)}
        />
    );
};

export const getHelpIcon = (helpText: ReactNode) => {
    const theme = useTheme();
    return (
        <IconButton
            size={16}
            style={{ width: 24, height: 24, padding: 0, marginHorizontal: 8 }}
            icon={md3PaperIconSource({ name: "help-outline", mode: "outline" })}
            iconColor={theme.colors.onTertiaryContainer}
            onPress={() => help.show(helpText)}
        />
    );
};

type HelpButtonProps = {
    helpContent: ReactNode;
} & TouchableOpacityProps;

export const HelpButton: React.FC<HelpButtonProps> = ({
    helpContent,
    children,
    ...props
}) => {
    const theme = useTheme();

    return (
        <TouchableOpacity
            onPress={() => help.show(helpContent)}
            // @ts-expect-error: Web-only style, allowed intentionally
            style={[{ cursor: "help" }, props.style]} // 👈 Add cursor style
        >
            <View style={[styles.container, props.style]}>
                <Icon
                    {...props}
                    source={md3PaperIconSource({
                        name: "help-outline",
                        mode: "outline",
                    })}
                    color={theme.colors.onTertiaryContainer}
                    size={16}
                />
                {children}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        gap: 8,
        alignItems: "flex-start", // Align children to the left
        justifyContent: "flex-start", // Optional: ensures items are left-aligned
    },
});
