import { ScrollView, StyleSheet, View } from "react-native";
import { Text, SegmentedButtons, TextInput } from "react-native-paper";
import StandardDragTable from "../dragModelTable/StandardDragTable";
import CustomDragTable from "../dragModelTable/CustomDragTable";
import {
    FieldEditFloat,
    FieldEditFloatProps,
    useProfileFieldState,
} from "../fieldsEdit/FieldEditInput";
import { BcType, Profile } from "a7p-js/dist/types";
import { HelpButton } from "./help/HelpIcons";
import { useHelp } from "./help/helpContent";
import { BulletFloatFields } from "./FieldProps";
import { useTranslation } from "react-i18next";
import { ContentTitle } from "./ContentTitle";

const bcTypeMap: Record<string, React.ReactNode> = {
    G1: <StandardDragTable model={BcType.G1} />,
    G7: <StandardDragTable model={BcType.G7} />,
    CUSTOM: <CustomDragTable />,
};

const DragModel = () => {
    const { t } = useTranslation();
    const helpContent = useHelp();

    const [bcType, setBcType] = useProfileFieldState<keyof Profile, BcType>({
        field: "bcType",
        defaultValue: BcType.G1,
    });

    const handleBcTypeChange = (value: string) => {
        setBcType(value as BcType); // value is safely typed as ModelType
    };

    const renderContent = () =>
        bcTypeMap[bcType] ?? <Text>{t("bulletContent.Unknown")}</Text>;

    return (
        <>
            <View style={styles.row}>
                <HelpButton
                    helpContent={helpContent.DragModel}
                    style={[styles.label, { alignContent: "center" }]}
                >
                    <Text style={styles.label}>
                        {t("bulletContent.DragModel")}
                    </Text>
                </HelpButton>
                <SegmentedButtons
                    style={styles.segmented}
                    onValueChange={handleBcTypeChange}
                    value={bcType}
                    buttons={[
                        {
                            value: BcType.G1,
                            label: t("bulletContent.G1"),
                        },
                        {
                            value: BcType.G7,
                            label: t("bulletContent.G7"),
                        },
                        {
                            value: BcType.CUSTOM,
                            label: t("bulletContent.CUSTOM"),
                        },
                    ]}
                />
            </View>
            <View style={{ flex: 1 }}>{renderContent()}</View>
        </>
    );
};

const BulletContent = () => {
    const { t } = useTranslation();
    const helpContent = useHelp();

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <ContentTitle
                title={t("bulletContent.Bullet")}
                helpKey="BulletCard"
            />

            <View style={styles.row}>
                <HelpButton
                    helpContent={helpContent.bDiameter}
                    style={[styles.label, { alignContent: "center" }]}
                >
                    <Text style={styles.label}>
                        {t("bulletContent.Diameter")}
                    </Text>
                </HelpButton>
                <FieldEditFloat //FIXME float
                    {...(BulletFloatFields.bDiameter as FieldEditFloatProps)}
                    style={styles.input}
                    right={<TextInput.Affix text={t("measure.inch")} />}
                />
            </View>

            <View style={styles.row}>
                <HelpButton
                    helpContent={helpContent.bWeight}
                    style={[styles.label, { alignContent: "center" }]}
                >
                    <Text style={styles.label}>
                        {t("bulletContent.Weight")}
                    </Text>
                </HelpButton>
                <FieldEditFloat //FIXME float
                    {...(BulletFloatFields.bWeight as FieldEditFloatProps)}
                    style={styles.input}
                    right={<TextInput.Affix text={t("measure.grain")} />}
                />
            </View>

            <View style={styles.row}>
                <HelpButton
                    helpContent={helpContent.bLength}
                    style={[styles.label, { alignContent: "center" }]}
                >
                    <Text style={styles.label}>
                        {t("bulletContent.Length")}
                    </Text>
                </HelpButton>
                <FieldEditFloat //FIXME float
                    {...(BulletFloatFields.bLength as FieldEditFloatProps)}
                    style={styles.input}
                    right={<TextInput.Affix text={t("measure.inch")} />}
                />
            </View>

            <DragModel />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        // gap: 8,
        maxWidth: 500,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 16,
        marginBottom: 12,
    },
    label: {
        flex: 1,
        alignItems: "flex-start",
    },
    input: {
        flex: 1,
    },
    segmented: {
        flex: 2,
    },
});

export default BulletContent;
