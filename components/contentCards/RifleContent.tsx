import { ScrollView, StyleSheet, View } from "react-native";
import { Text, SegmentedButtons, TextInput } from "react-native-paper";
import {
    FieldEdit,
    FieldEditFloat,
    FieldEditFloatProps,
    FieldEditProps,
    useProfileFieldState,
} from "@/components/fieldsEdit/FieldEditInput";
import { Profile, TwistDir } from "a7p-js/dist/types";
import { useHelp } from "@/components/contentCards//help/helpContent";
import { HelpButton } from "@/components/contentCards/help/HelpIcons";
import { useTranslation } from "react-i18next";
import { md3PaperIconSource } from "@/components/icons/MD3PaperIcons";
import { ContentTitle } from "@/components/contentCards/ContentTitle";
import { RifleFloatFields, RifleTextFields } from "@/components/contentCards/FieldProps";

const TwistField = () => {
    const { t } = useTranslation();

    const [twistDir, setTwistDir] = useProfileFieldState<
        keyof Profile,
        TwistDir
    >({
        field: "twistDir",
        defaultValue: TwistDir.RIGHT,
    });

    return (
        <SegmentedButtons
            style={styles.segmented}
            onValueChange={(value) => setTwistDir(value as TwistDir)}
            value={twistDir}
            buttons={[
                {
                    value: TwistDir.LEFT,
                    label: t("rifleContent.Left"),
                    icon: md3PaperIconSource({
                        name: "rotate-left",
                        mode: "outline",
                    }),
                },
                {
                    value: TwistDir.RIGHT,
                    label: t("rifleContent.Right"),
                    icon: md3PaperIconSource({
                        name: "rotate-right",
                        mode: "outline",
                    }),
                },
            ]}
        />
    );
};

const RifleContent = () => {
    const { t } = useTranslation();
    const helpContent = useHelp();

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <ContentTitle title={t("rifleContent.Rifle")} helpKey="RifleCard" />

            <View style={styles.row}>
                <HelpButton
                    helpContent={helpContent.caliber}
                    style={[styles.label, { alignContent: "center" }]}
                >
                    <Text>{t("rifleContent.Caliber")}</Text>
                </HelpButton>
                <FieldEdit //FIXME float
                    {...(RifleTextFields.caliber as FieldEditProps)}
                    style={styles.input}
                />
            </View>

            <View style={styles.row}>
                <HelpButton
                    helpContent={helpContent.rTwist}
                    style={[styles.label, { alignContent: "center" }]}
                >
                    <Text>{t("rifleContent.TwistRate")}</Text>
                </HelpButton>
                <FieldEditFloat //FIXME float
                    {...(RifleFloatFields.rTwist as FieldEditFloatProps)}
                    style={styles.input}
                    right={<TextInput.Affix text={t("measure.inch_turn")} />}
                />
            </View>

            <View style={styles.row}>
                <HelpButton
                    helpContent={helpContent.twistDir}
                    style={[styles.label, { alignContent: "center" }]}
                >
                    <Text>{t("rifleContent.TwistDirection")}</Text>
                </HelpButton>
                <TwistField />
            </View>

            <View style={styles.row}>
                <HelpButton
                    helpContent={helpContent.scHeight}
                    style={[styles.label, { alignContent: "center" }]}
                >
                    <Text>{t("rifleContent.SightHeight")}</Text>
                </HelpButton>
                <FieldEditFloat //FIXME float
                    {...(RifleFloatFields.scHeight as FieldEditFloatProps)}
                    style={styles.input}
                    right={<TextInput.Affix text={t("measure.mm")} />}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        gap: 8,
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
    inputContainer: {
        flex: 3,
        flexDirection: "row",
        gap: 8,
    },
    input: {
        flex: 1,
    },
    extraInput: {
        flex: 1, // Ensure extra fields also occupy available space
    },
    sectionTitle: {
        flex: 1,
        marginBottom: 4,
    },
    divider: {
        flex: 3,
    },
    segmented: {
        flex: 1,
    },
});

export default RifleContent;
