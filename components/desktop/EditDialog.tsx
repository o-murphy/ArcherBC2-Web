import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { Dialog, Surface } from "react-native-paper";
import SideBar from "./SideBar";
import TopBar from "./TopBar";
import { useFileContext } from "@/hooks/fileService/fileContext";
import { ContentNavigator } from "./contentNavigator";
import { useNavigation } from "@react-navigation/native";


// Type for dialog dimensions
type DialogDimensions = {
    dialogWidth: number;
    dialogHeight: number;
};

// Function to calculate dialog width and height based on window dimensions
const calculateDialogDimensions = (): DialogDimensions => {
    const { width, height } = Dimensions.get("window");

    const dialogWidth = width < 1024 ? (width < 1024 ? width : 720) : 1024;
    const dialogHeight = height < 720 ? (height < 720 ? height : 540) : 720;

    return { dialogWidth, dialogHeight };
};


const EditDialog = () => {
    const [dialogDimensions, setDialogDimensions] = useState<DialogDimensions>(calculateDialogDimensions());
    const [visible, setVisible] = useState<boolean>(false);
    const [selectedRoute, setSelectedRoute] = useState<string>("description");
    const navigation = useNavigation();

    const { currentData } = useFileContext();

    useEffect(() => {
        setVisible(!!currentData.profile);
    }, [currentData]);

    useEffect(() => {
        const handleResize = () => {
            setDialogDimensions(calculateDialogDimensions());
        };
        const subscription = Dimensions.addEventListener("change", handleResize);
        return () => subscription.remove();
    }, []);

    const handleContentNavigate = (routeName: string) => {
        console.log("Navigate from content to:", routeName);
        setSelectedRoute(routeName);
        navigation.navigate(routeName as never);
    };

    return (
        <Dialog
            visible={visible}
            dismissable={false}
            style={[styles.dialog, { width: dialogDimensions.dialogWidth, height: dialogDimensions.dialogHeight }]}
        >
            <Dialog.Title style={styles.dialogTitle}>
                <TopBar />
            </Dialog.Title>
            <Dialog.Content style={styles.dialogContent}>
                <SideBar
                    navigation={navigation}
                    setSelectedRoute={setSelectedRoute}
                    selectedRoute={selectedRoute}
                />
                <Surface style={styles.surfaceContent}>
                    <ContentNavigator onContentNavigate={handleContentNavigate} /> {/* Pass the callback */}
                </Surface>
            </Dialog.Content>
        </Dialog>
    );
};


const styles = StyleSheet.create({
    surfaceContent: {
        flex: 1,
        marginLeft: 16,
        height: "100%",
        borderRadius: 16,
        padding: 24,
    },
    dialog: {
        width: 1024,
        height: 720,
        alignSelf: "center",
    },
    dialogTitle: {
        justifyContent: "center",
        overflow: "hidden",
        borderRadius: 16,
    },
    dialogContent: {
        flex: 1,
        flexDirection: "row",
        alignItems: "stretch", // important to allow vertical growth
        borderRadius: 16,
    },
});

export default EditDialog;
