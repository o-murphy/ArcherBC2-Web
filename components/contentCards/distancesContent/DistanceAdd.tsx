import { DoubleSpinBox } from "@/components/fieldsEdit/DoubleSpinBox";
import { md3PaperIconSource } from "@/components/icons/MD3PaperIcons"
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native"
import { FAB } from "react-native-paper"
import { DistancesFloatFields } from "../FieldProps";
import { useFileContext } from "@/hooks/fileService/fileContext";
import { ParsedData } from "@/hooks/fileService/useFileParsing";
import { useResponsiveLayout } from "@/hooks/useResponsiveLayout";



export const DistancesAdd = () => {
    const { t } = useTranslation();
    const { currentData, setCurrentData } = useFileContext()
    const { layout: layoutMode } = useResponsiveLayout()

    const [value, setValue] = useState<number>(1)
    const [disabled, setDisabled] = useState<boolean>(false)

    useEffect(() => {
        const len = (currentData.profile?.distances || []).length
        setDisabled(len >= 200)
    }, [currentData.profile?.distances])

    const onAddPress = () => {
        if (currentData?.profile?.distances) {
            if (currentData?.profile?.distances.length < 200) {
                setCurrentData((prev) => ({
                    ...prev,
                    profile: {
                        ...prev.profile,
                        distances: [
                            Math.round(value * 100),
                            ...prev.profile?.distances || []
                        ],
                        cZeroDistanceIdx: (prev.profile?.cZeroDistanceIdx ?? -1) + 1
                    }
                } as ParsedData))
            }
        }
    }

    return (
        <View style={styles.container}>
            <DoubleSpinBox
                {...DistancesFloatFields.distances}
                floatValue={value}
                mode="outlined"
                onFloatValueChange={setValue}
                style={styles.input}
            />
            <FAB
                size="small"
                mode="flat"
                variant="surface"
                icon={md3PaperIconSource({ name: "add" })}
                label={layoutMode === "desktop" ? t("distancesContent.Add") : ""}
                onPress={onAddPress}
                disabled={disabled}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        flexDirection: "row",
        alignContent: "center",
        gap: 16
    },
    input: {
        flex: 1,
        height: 32
    },
})