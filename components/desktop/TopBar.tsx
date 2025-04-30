import { StyleSheet, View } from "react-native";
import { Surface, Text } from "react-native-paper";
import { useFileContext } from "@/hooks/fileService/fileContext";
import { CloseDialogWidget } from "../dialogs/CloseDialog";
import { ToolTipIconButton } from "../IconButtonWithTooltip";
import { md3PaperIconSource } from "@/components/icons/MD3PaperIcons";
import { ShareDialogWidget } from "../dialogs/ShareDialog";
import { FileOpenerService } from "../../hooks/fileService/fileOpener";
import { LanguageToggle } from "../LanguageToggle";
import { useTranslation } from "react-i18next";
import { useResponsiveLayout } from "@/hooks/useResponsiveLayout";
import { FileMenu } from "../mobile/FileMenu";
import { openLibrary } from "@/utils/openLibrary";
import { ThemeToggle } from "../ThemeToggle";

const TopBar = () => {
    const { t } = useTranslation();
    const { syncBackup, restoreBackup, saveFile } = useFileContext();
    const { width } = useResponsiveLayout();

    const onOpenPress = () => {
        console.log("Open pressed");
        FileOpenerService.triggerFileInputClick();
    };

    const onSavePress = () => {
        syncBackup();
        saveFile();
        console.log("SyncBackup");
    };

    const onReloadPress = () => {
        restoreBackup();
        console.log("RestoreBackup");
    };

    const onLibraryPress = () => {
        openLibrary()
    }

    const renderTooltips = width >= 700;

    return (
        <Surface elevation={1} style={styles.topBar}>
            {renderTooltips ? (
                <>
                    <CloseDialogWidget />
                    <View style={styles.separator} />

                    {/* <ToolTipIconButton
                        tooltip={t("topBar.Create new file")}
                        icon={md3PaperIconSource({ name: "file-open" })}
                        onPress={() => { }}
                        disabled
                    /> */}
                    <ToolTipIconButton
                        tooltip={t("topBar.OpenFile")}
                        icon={md3PaperIconSource({ name: "folder-open" })}
                        onPress={onOpenPress}
                    />
                    <ToolTipIconButton
                        tooltip={t("topBar.Download")}
                        icon={md3PaperIconSource({ name: "file-download" })}
                        onPress={onSavePress}
                    />
                    <ToolTipIconButton
                        tooltip={t("topBar.RejectChanges")}
                        icon={md3PaperIconSource({ name: "refresh" })}
                        onPress={onReloadPress}
                    />
                    <ToolTipIconButton
                        tooltip={t("topBar.LoadZeroing")}
                        icon={md3PaperIconSource({ name: "my-location" })}
                        onPress={() => { }}
                        disabled
                    />

                    <ToolTipIconButton
                        tooltip={t("topBar.Library")}
                        icon={md3PaperIconSource({ name: "storage" })}
                        onPress={onLibraryPress}
                    />
                    <ShareDialogWidget />
                </>
            ) : (
                <FileMenu />
            )}

            <View style={styles.rightSide}>
                <View style={styles.separator} />
                <ThemeToggle />
                <LanguageToggle />
                <View style={styles.separator} />
                <Text variant="titleLarge" style={styles.topBarTitle}>
                    ArcherBC2
                </Text>
            </View>
        </Surface>
    );
};

const styles = StyleSheet.create({
    topBar: {
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 16,
        width: "100%",
        flexWrap: "wrap-reverse",
    },
    topBarTitle: {
        textAlign: "right",
        alignSelf: "center",
        marginHorizontal: 16,
    },
    separator: {
        backgroundColor: "#666",
        width: 1,
        height: 24,
    },
    rightSide: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        flexGrow: 1,
        gap: 4,
        flexWrap: "wrap",
    },
});

export default TopBar;
