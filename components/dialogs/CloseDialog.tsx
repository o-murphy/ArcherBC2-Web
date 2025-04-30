import { useFileContext } from "@/hooks/fileService/fileContext";
import { useState } from "react";
import { StyleSheet } from "react-native";
import {
    Button,
    Dialog,
    Portal,
    Surface,
    Text,
    Tooltip,
    useTheme,
    FAB,
    Menu,
} from "react-native-paper";
import { ToolTipIconButton } from "@/components/IconButtonWithTooltip";
import { useTranslation } from "react-i18next";
import { MD3PaperIcon, md3PaperIconSource } from "@/components/icons/MD3PaperIcons";

export const CloseDialogButton = ({
    icon = md3PaperIconSource({ name: "close" }),
    ...props
}) => {
    const theme = useTheme();
    const { t } = useTranslation();

    return (
        <ToolTipIconButton
            tooltip={t("closeDialog.Close")}
            icon={icon}
            iconColor={theme.colors.error}
            {...props}
        />
    );
};

interface CloseDialogProps {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CloseDialog: React.FC<CloseDialogProps> = ({
    visible,
    setVisible,
}: {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const { closeFile, saveFile } = useFileContext();
    const theme = useTheme();
    const { t } = useTranslation();

    const savePress = () => {
        saveFile();
    };

    const notSavePress = () => {
        closeFile(false);
        closeDialog();
    };

    const closeDialog = () => {
        setVisible(false);
    };

    return (
        <Dialog visible={visible} style={styles.dialog} onDismiss={closeDialog}>
            <Surface elevation={0}>
                <Dialog.Title style={styles.dialogTitle}>
                    ⚠️ {t("closeDialog.Title")} ⚠️
                </Dialog.Title>
                <Dialog.Content style={styles.dialogContent}>
                    <Text variant="bodyLarge" style={{ textAlign: "center" }}>
                        {t("closeDialog.Question")}
                    </Text>
                    <Text
                        variant="bodyLarge"
                        style={[styles.warning, { color: theme.colors.error }]}
                    >
                        🔴 {t("closeDialog.Warning")}
                    </Text>
                    <FAB
                        mode="flat"
                        variant="primary"
                        style={styles.fab}
                        icon={md3PaperIconSource({ name: "file-download" })}
                        onPress={savePress}
                        label={t("closeDialog.Download")}
                    />
                </Dialog.Content>
                <Dialog.Actions style={styles.dialogActions}>
                    <Button
                        mode="outlined"
                        style={styles.actionButton}
                        icon={md3PaperIconSource({ name: "delete-forever" })}
                        onPress={notSavePress}
                        buttonColor={theme.colors.tertiaryContainer}
                        textColor={theme.colors.onTertiaryContainer}
                    >
                        {t("closeDialog.CloseWithoutSaving")}
                    </Button>
                    <Button
                        mode="outlined"
                        style={styles.actionButton}
                        icon={md3PaperIconSource({ name: "cancel" })}
                        onPress={closeDialog}
                    >
                        {t("closeDialog.Cancel")}
                    </Button>
                </Dialog.Actions>
            </Surface>
        </Dialog>
    );
};

export const CloseDialogWidget = () => {
    const [visible, setVisible] = useState(false);
    const { t } = useTranslation();

    return (
        <>
            <Tooltip title={t("closeDialog.Close")} leaveTouchDelay={0.2}>
                <CloseDialogButton onPress={() => setVisible(true)} />
            </Tooltip>
            <Portal>
                <CloseDialog
                    visible={visible}
                    setVisible={() => setVisible(false)}
                />
            </Portal>
        </>
    );
};

export const CloseDialogMenuAction = () => {
    const [visible, setVisible] = useState(false);
    const { t } = useTranslation();
    const theme = useTheme();

    return (
        <>
            <Menu.Item
                leadingIcon={(props) =>
                    MD3PaperIcon({
                        ...props,
                        name: "close",
                        color: theme.colors.error,
                    })
                }
                onPress={() => setVisible(true)}
                title={t("closeDialog.Close")}
                titleStyle={{ color: theme.colors.error }} // Set the text color here
            />
            <Portal>
                <CloseDialog
                    visible={visible}
                    setVisible={() => setVisible(false)}
                />
            </Portal>
        </>
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
    dialogActions: {
        justifyContent: "space-around",
    },
    dialogContent: {
        alignItems: "center",
    },
    actionButton: {
        flex: 1,
    },
    fab: {
        flex: 1,
        marginTop: 16,
    },
    warning: {},
});

export default CloseDialog;
