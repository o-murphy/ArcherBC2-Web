import { HelpButton } from "./help/HelpIcons";
import { Text } from "react-native-paper";
import { StyleSheet } from "react-native";
import { useHelp } from "./help/helpContent";
import { useResponsiveLayout } from "@/hooks/useResponsiveLayout";

export const ContentTitle = ({
    title,
    helpKey,
}: {
    title: string;
    helpKey: string;
}) => {
    const { layout: layoutMode } = useResponsiveLayout();
    const helpContent = useHelp();

    if (layoutMode === "mobile") {
        return <></>;
    }

    return (
        <HelpButton helpContent={helpContent[helpKey]}>
            <Text variant="titleLarge" style={styles.header}>
                {title}
            </Text>
        </HelpButton>
    );
};

const styles = StyleSheet.create({
    header: {
        marginBottom: 8,
    },
});
