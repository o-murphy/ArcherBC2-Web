import { ScrollView, StyleSheet, View } from "react-native";
import { TextInput, Text } from "react-native-paper";
import {
    FieldEditFloat,
    FieldEditFloatProps,
} from "../fieldsEdit/FieldEditInput";
import { CartridgeFields } from "./FieldProps";
import { HelpButton } from "./help/HelpIcons";
import { useHelp } from "./help/helpContent";
import { useTranslation } from "react-i18next";
import { ContentTitle } from "./ContentTitle";

const CartridgeContent = () => {
    const { t } = useTranslation();
    const helpContent = useHelp();

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <ContentTitle
                title={t("cartridgeContent.Cartridge")}
                helpKey="CartridgeCard"
            />

            <View style={styles.row}>
                <HelpButton
                    helpContent={helpContent.cMuzzleVelocity}
                    style={[styles.label, { alignContent: "center" }]}
                >
                    <Text>{t("cartridgeContent.MuzzleVelocity")}</Text>
                </HelpButton>

                <FieldEditFloat //FIXME float
                    {...(CartridgeFields.cMuzzleVelocity as FieldEditFloatProps)}
                    style={styles.input}
                    right={<TextInput.Affix text={t("measure.mps")} />}
                />
            </View>

            <View style={styles.row}>
                <HelpButton
                    helpContent={helpContent.cZeroTemperature}
                    style={[styles.label, { alignContent: "center" }]}
                >
                    <Text>{t("cartridgeContent.PowderTemperature")}</Text>
                </HelpButton>
                <FieldEditFloat //FIXME float
                    {...(CartridgeFields.cZeroTemperature as FieldEditFloatProps)}
                    style={styles.input}
                    right={<TextInput.Affix text={t("measure.°C")} />}
                />
            </View>

            <View style={styles.row}>
                <HelpButton
                    helpContent={helpContent.cTCoeff}
                    style={[styles.label, { alignContent: "center" }]}
                >
                    <Text>{t("cartridgeContent.TemperatureSensitivity")}</Text>
                </HelpButton>
                <FieldEditFloat //FIXME float
                    {...(CartridgeFields.cTCoeff as FieldEditFloatProps)}
                    style={styles.input}
                    left={<TextInput.Icon icon={"calculator"} />}
                    right={<TextInput.Affix text={t("measure.%/15°C")} />}
                />
            </View>
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
});

export default CartridgeContent;
