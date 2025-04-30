import { Appbar, Divider, FAB, Menu, useTheme } from "react-native-paper";
import { md3PaperIconSource } from "../icons/MD3PaperIcons";
import { ShareDialogMenuItem } from "../dialogs/ShareDialog";
import { CloseDialogMenuAction } from "../dialogs/CloseDialog";
import { FileOpenerService } from "@/hooks/fileService/fileOpener";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useFileContext } from "@/hooks/fileService/fileContext";
import { openLibrary } from "@/utils/openLibrary";

export const FileMenu = () => {
    const theme = useTheme();
    const { t } = useTranslation();
    const [visible, setVisible] = useState(false);
    const { syncBackup, restoreBackup, saveFile } = useFileContext();

    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    const onOpenPress = () => {
        console.log("Open pressed");
        closeMenu();
        FileOpenerService.triggerFileInputClick();
    };

    const onSavePress = () => {
        closeMenu();
        syncBackup();
        saveFile();
        console.log("SyncBackup");
    };

    const onReloadPress = () => {
        closeMenu();
        restoreBackup();
        console.log("RestoreBackup");
    };

    const onLibraryPress = () => {
        openLibrary()
    }

    return (
        <Menu
            visible={visible}
            onDismiss={closeMenu}
            // anchor={<Appbar.Action icon="menu" color={theme.colors.onPrimaryContainer} onPress={openMenu} />}>
            anchor={
                <FAB
                    size="small"
                    style={{ margin: 8 }}
                    mode="flat"
                    icon="menu"
                    color={theme.colors.onPrimaryContainer}
                    onPress={openMenu}
                />
            }
        >
            {/* <Menu.Item
                leadingIcon={md3PaperIconSource({ name: "file-open" })}
                disabled
                onPress={() => { }}
                title={t("topBar.Create new file")}
            /> */}
            <Menu.Item
                leadingIcon={md3PaperIconSource({ name: "folder-open" })}
                onPress={onOpenPress}
                title={t("topBar.OpenFile")}
            />
            <Menu.Item
                leadingIcon={md3PaperIconSource({ name: "file-download" })}
                onPress={onSavePress}
                title={t("topBar.Download")}
            />
            <Menu.Item
                leadingIcon={md3PaperIconSource({ name: "refresh" })}
                onPress={onReloadPress}
                title={t("topBar.RejectChanges")}
            />
            <Menu.Item
                leadingIcon={md3PaperIconSource({ name: "my-location" })}
                disabled
                onPress={() => { }}
                title={t("topBar.LoadZeroing")}
            />
            <Menu.Item
                leadingIcon={md3PaperIconSource({ name: "storage" })}
                onPress={onLibraryPress}
                title={t("topBar.Library")}
            />
            <ShareDialogMenuItem />
            <Divider />
            <CloseDialogMenuAction />
        </Menu>
    );
};
