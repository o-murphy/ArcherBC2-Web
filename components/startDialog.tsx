import { useEffect, useRef, useState } from "react";
import { StyleSheet } from "react-native";
import { Button, Dialog, Portal, Surface, Text, TouchableRipple } from "react-native-paper"
import { FileInput } from "./fileInput";
import { useFileHandler, AllowedExtensions } from "@/hooks/useFileHandler";
import { useFileContext } from "@/hooks/fileContext";
import { useParseFile } from "@/hooks/useFileParsing";
import { DropZoneWeb } from "./dropZone/dropZone";


const StartDialog = () => {

    const [visible, setVisible] = useState(true)
    const { fileHandleState, handleFileChange, processFile } = useFileHandler();  // Use the custom hook
    const { fileState, currentData: parsedData } = useFileContext()

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (!fileState.error && parsedData.profile) {
            setVisible(false)
        } else {
            setVisible(true)
        }
    }, [fileState, parsedData])

    // Use the reusable file parsing hook
    useParseFile(fileHandleState);

    const onCreatePress = () => {
        console.log("Create pressed")
    }

    const onOpenPress = () => {
        console.log("Open pressed");
        if (fileInputRef?.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <Portal>
            <Dialog visible={visible} style={styles.dialog}>
                <DropZoneWeb onDropFile={processFile}>

                    <TouchableRipple style={styles.touchable} onPress={onOpenPress}>
                        <Surface elevation={0}>
                            <Dialog.Title style={styles.dialogTitle}>
                                ArcherBC2
                            </Dialog.Title>

                            <Dialog.Content style={styles.dialogContent}>
                                <Text variant="headlineMedium">
                                    Start menu
                                </Text>
                                <Text variant="bodyLarge">
                                    {/* <Dialog.Icon icon="file" /> */}
                                    Open or create new profile
                                </Text>
                                <Text variant="bodyMedium">
                                    (or drag'n'drop file here)
                                </Text>
                            </Dialog.Content>
                            <Dialog.Actions style={styles.dialogActions}>
                                <Button mode="contained-tonal" style={styles.actionButton} onPress={onCreatePress} disabled>Create new</Button>
                                <Button mode="contained-tonal" style={styles.actionButton} onPress={onOpenPress}>Open</Button>
                            </Dialog.Actions>
                        </Surface>
                    </TouchableRipple>

                </DropZoneWeb>
            </Dialog>
            <FileInput fileInputRef={fileInputRef} handleFileChange={handleFileChange} allowedExtensions={AllowedExtensions} />
        </Portal>
    )
}


const styles = StyleSheet.create({
    dialog: {
        width: 400,
        alignSelf: "center",
    },
    dialogTitle: {
        textAlign: "center"
    },
    dialogActions: {
        justifyContent: "space-around"
    },
    dialogContent: {
        alignItems: "center"
    },
    actionButton: {
        flex: 1,
    },
    touchable: {
        // margin: 8,
        // marginTop: 8,
        // borderWidth: 2,
        // borderStyle: "dashed",
        // borderColor: "#555",
        borderRadius: 24,
    }
})


export default StartDialog;