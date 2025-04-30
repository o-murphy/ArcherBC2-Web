import { ReactNode, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import {
    Button,
    Dialog,
    Surface,
    Text,
    TouchableRipple,
} from "react-native-paper";
import { useFileHandler } from "@/hooks/fileService/useFileHandler";
import { useFileContext } from "@/hooks/fileService/fileContext";
import { DropZoneWeb } from "../dropZone/DropZone";
import { FileOpenerService } from "../../hooks/fileService/fileOpener";
import { useParseFile } from "@/hooks/fileService/useFileParsing";
import { useTranslation } from "react-i18next";
import { LanguageToggle } from "../LanguageToggle";
import { openLibrary } from "@/utils/openLibrary";
import { md3PaperIconSource } from "../icons/MD3PaperIcons";

const StartDialogDropZone = ({ children }: { children: ReactNode }) => {
    const { fileHandleState, processFile } = useFileHandler(); // Use the custom hook
    useParseFile(fileHandleState);
    return <DropZoneWeb onDropFile={processFile}>{children}</DropZoneWeb>;
};

const StartDialog = () => {
    const { t } = useTranslation();

    const [visible, setVisible] = useState(true);
    const { fileState, currentData } = useFileContext();

    useEffect(() => {
        if (!fileState.error && currentData.profile) {
            setVisible(false);
        } else {
            setVisible(true);
        }
    }, [fileState, currentData]);

    const onCreatePress = () => {
        console.log("Create pressed");
    };

    const onOpenPress = () => {
        FileOpenerService.triggerFileInputClick();
    };

    const onLibraryPress = () => {
        openLibrary()
    }

    return (
        <Dialog visible={visible} style={styles.dialog} dismissable={false}>
            <StartDialogDropZone>
                <TouchableRipple style={styles.touchable} onPress={onOpenPress}>
                    <View>
                        <Dialog.Title style={styles.dialogTitle}>
                            ArcherBC2
                            <LanguageToggle />
                        </Dialog.Title>

                        <Dialog.Content style={styles.dialogContent}>
                            <Text variant="headlineMedium">
                                {t("startDialog.StartMenu")}
                            </Text>
                            <Text variant="bodyLarge">
                                {/* <Dialog.Icon icon="file" /> */}
                                {t("startDialog.OpenOrCreateNewProfile")}
                            </Text>
                            <Text variant="bodyMedium">
                                {t("startDialog.dndHere")}
                            </Text>
                        </Dialog.Content>
                        <Dialog.Actions style={styles.dialogActionsCol}>
                            <View style={styles.dialogActionsRow}>
                                <Button
                                    icon={md3PaperIconSource({ name: "file-open" })}
                                    mode="contained-tonal"
                                    style={styles.actionButton}
                                    onPress={onCreatePress}
                                    disabled
                                >
                                    {t("startDialog.CreateNew")}
                                </Button>
                                <Button
                                    icon={md3PaperIconSource({ name: "folder-open" })}
                                    mode="contained-tonal"
                                    style={styles.actionButton}
                                    onPress={onOpenPress}
                                >
                                    {t("startDialog.Open")}
                                </Button>
                            </View>
                            <Button
                                icon={md3PaperIconSource({ name: "storage" })}
                                mode="outlined"
                                style={styles.dialogActionsRow}
                                onPress={onLibraryPress}
                            >
                                {t("startDialog.OpenLibrary")}
                            </Button>
                        </Dialog.Actions>
                    </View>
                </TouchableRipple>
            </StartDialogDropZone>
        </Dialog>
    );
};

const styles = StyleSheet.create({
    dialog: {
        minWidth: 400,
        maxWidth: 500,
        maxHeight: 500,
        alignSelf: "center",
    },
    dialogTitle: {
        textAlign: "center",
    },
    dialogActionsRow: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-around",
        gap: 8
    },
    dialogActionsCol: {
        width: "100%",
        flexDirection: "column",
        justifyContent: "space-around",
        gap: 8
    },
    dialogContent: {
        alignItems: "center",
    },
    actionButton: {
        flex: 1,
    },
    touchable: {
        borderRadius: 24,
    },
});

export default StartDialog;
