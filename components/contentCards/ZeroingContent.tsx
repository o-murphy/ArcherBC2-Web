import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Text, TextInput } from "react-native-paper";
import {
    FieldEditFloat,
    FieldEditFloatProps,
} from "@/components/fieldsEdit/FieldEditInput";
import ZeroDistanceField from "@/components/fieldsEdit/ZeroDistanceField";
import { useHelp } from "@/components/contentCards/help/helpContent";
import { HelpButton } from "@/components/contentCards/help/HelpIcons";
import { ZeroingFloatFields } from "@/components/contentCards/FieldProps";
import { ThemedIcon, ThemedIconName } from "@/components/icons/CustomIcons";
import { useTranslation } from "react-i18next";
import { ContentTitle } from "@/components/contentCards/ContentTitle";


interface ZeroingFieldConfig {
    labelKey: string;
    helpKey: keyof ReturnType<typeof useHelp>;
    fieldKey: keyof typeof ZeroingFloatFields;
    unitKey?: string;
    iconName?: ThemedIconName;
}

const zeroingFieldsConfig: ZeroingFieldConfig[] = [
    {
        labelKey: "ZeroX",
        helpKey: "zeroX",
        fieldKey: "zeroX",
        unitKey: "measure.click",
    },
    {
        labelKey: "ZeroY",
        helpKey: "zeroY",
        fieldKey: "zeroY",
        unitKey: "measure.click",
    },
    {
        labelKey: "AirTemperature",
        helpKey: "cZeroAirTemperature",
        fieldKey: "cZeroAirTemperature",
        unitKey: "measure.°C",
    },
    {
        labelKey: "AirPressure",
        helpKey: "cZeroAirPressure",
        fieldKey: "cZeroAirPressure",
        unitKey: "measure.hPa",
    },
    {
        labelKey: "AirHumidity",
        helpKey: "cZeroAirHumidity",
        fieldKey: "cZeroAirHumidity",
        unitKey: "measure.%",
    },
    {
        labelKey: "PowderTemperature",
        helpKey: "cZeroPTemperature",
        fieldKey: "cZeroPTemperature",
        unitKey: "measure.°C",
    },
    {
        labelKey: "Pitch",
        helpKey: "cZeroWPitch",
        fieldKey: "cZeroWPitch",
        unitKey: "measure.degree",
    },
];

const ZeroingField: React.FC<ZeroingFieldConfig> = ({
    labelKey,
    helpKey,
    fieldKey,
    unitKey,
    iconName,
}) => {
    const { t } = useTranslation();
    const helpContent = useHelp();
    const fieldProps = ZeroingFloatFields[fieldKey] as FieldEditFloatProps;

    return (
        <View style={styles.row}>
            <HelpButton
                helpContent={helpContent[helpKey]}
                style={[styles.label, { alignContent: "center" }]}
            >
                <Text>{t(`zeroingContent.${labelKey}`)}</Text>
            </HelpButton>
            <FieldEditFloat //FIXME float
                {...fieldProps}
                style={styles.input}
                right={unitKey ? <TextInput.Affix text={t(unitKey)} /> : undefined}
                left={iconName ? <TextInput.Icon icon={iconName} /> : undefined}
            />
        </View>
    );
};


const ZeroingContent = () => { // Receive the prop
    const { t } = useTranslation();
    const helpContent = useHelp()

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <ContentTitle
                title={t("zeroingContent.Zeroing")}
                helpKey="ZeroingCard"
            />

            <View style={styles.column}>
                <View style={styles.row}>
                    <HelpButton
                        helpContent={helpContent.cZeroDistanceIdx}
                        style={[styles.label, { alignContent: "center" }]}
                    >
                        <Text>{t("zeroingContent.ZeroDistance")}</Text>
                    </HelpButton>
                    <View
                        style={[
                            styles.row,
                            styles.input,
                            { gap: 8, alignItems: "center" },
                        ]}
                    >
                        <ThemedIcon source="zeroing-distance" size={24} />
                        <ZeroDistanceField style={styles.select} />
                    </View>
                </View>
                {zeroingFieldsConfig.map((config) => (
                    <ZeroingField key={config.fieldKey} {...config} />
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
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
    select: {
        flex: 3,
    },
    distancesEditBtn: {
        borderRadius: 4,
        margin: 0,
    },
    column: {
        flex: 1,
    },
});

export default ZeroingContent;

// import { ScrollView, StyleSheet, View } from "react-native";
// import { Text, TextInput } from "react-native-paper";
// import {
//     FieldEditFloat,
//     FieldEditFloatProps,
// } from "../fieldsEdit/fieldEditInput";
// import ZeroDistanceField from "../fieldsEdit/zeroDistanceField";
// import { useHelp } from "./help/helpContent";
// import { HelpButton } from "./help/helpIcons";
// import { ZeroingFloatFields } from "./fiedProps";
// import { ThemedIcon } from "../icons/customIcons";
// import { useTranslation } from "react-i18next";
// import { ToolTipIconButton } from "../iconButtonWithTooltip";
// import { ContentTitle } from "./contentTitle";

// const ZeroingContent = ({
//     onDistancesBtnPress,
// }: {
//     onDistancesBtnPress?: () => void;
// }) => {
//     const { t } = useTranslation();
//     const helpContent = useHelp();

//     return (
//         <ScrollView contentContainerStyle={styles.container}>
//             <ContentTitle
//                 title={t("zeroingContent.Zeroing")}
//                 helpKey="ZeroingCard"
//             />

//             <View style={styles.column}>
//                 <View style={styles.row}>
//                     <HelpButton
//                         helpContent={helpContent.zeroX}
//                         style={[styles.label, { alignContent: "center" }]}
//                     >
//                         <Text>{t("zeroingContent.ZeroX")}</Text>
//                     </HelpButton>

//                     <FieldEditFloat //FIXME float
//                         {...(ZeroingFloatFields.zeroX as FieldEditFloatProps)}
//                         style={styles.input}
//                         right={<TextInput.Affix text={t("measure.click")} />}
//                     />
//                 </View>

//                 <View style={styles.row}>
//                     <HelpButton
//                         helpContent={helpContent.zeroY}
//                         style={[styles.label, { alignContent: "center" }]}
//                     >
//                         <Text>{t("zeroingContent.ZeroY")}</Text>
//                     </HelpButton>
//                     <FieldEditFloat //FIXME float
//                         {...(ZeroingFloatFields.zeroY as FieldEditFloatProps)}
//                         style={styles.input}
//                         right={<TextInput.Affix text={t("measure.click")} />}
//                     />
//                 </View>

//                 <View style={styles.row}>
//                     <HelpButton
//                         helpContent={helpContent.cZeroDistanceIdx}
//                         style={[styles.label, { alignContent: "center" }]}
//                     >
//                         <Text>{t("zeroingContent.ZeroDistance")}</Text>
//                     </HelpButton>
//                     <View
//                         style={[
//                             styles.row,
//                             styles.input,
//                             { gap: 8, alignItems: "center" },
//                         ]}
//                     >
//                         <ThemedIcon source="zeroing-distance" size={24} />

//                         <ZeroDistanceField style={styles.select} />
//                         <ToolTipIconButton
//                             tooltip={t("zeroingContent.EditDistances")}
//                             style={styles.distancesEditBtn}
//                             mode="outlined"
//                             icon={"playlist-edit"}
//                             onPress={onDistancesBtnPress}
//                         />
//                     </View>
//                 </View>

//                 <View style={styles.row}>
//                     <HelpButton
//                         helpContent={helpContent.cZeroAirTemperature}
//                         style={[styles.label, { alignContent: "center" }]}
//                     >
//                         <Text>{t("zeroingContent.AirTemperature")}</Text>
//                     </HelpButton>
//                     <FieldEditFloat //FIXME float
//                         {...(ZeroingFloatFields.cZeroAirTemperature as FieldEditFloatProps)}
//                         style={styles.input}
//                         right={<TextInput.Affix text={t("measure.°C")} />}
//                     />
//                 </View>

//                 <View style={styles.row}>
//                     <HelpButton
//                         helpContent={helpContent.cZeroAirPressure}
//                         style={[styles.label, { alignContent: "center" }]}
//                     >
//                         <Text>{t("zeroingContent.AirPressure")}</Text>
//                     </HelpButton>
//                     <FieldEditFloat //FIXME float
//                         {...(ZeroingFloatFields.cZeroAirPressure as FieldEditFloatProps)}
//                         style={styles.input}
//                         right={<TextInput.Affix text={t("measure.hPa")} />}
//                     />
//                 </View>

//                 <View style={styles.row}>
//                     <HelpButton
//                         helpContent={helpContent.cZeroWPitch}
//                         style={[styles.label, { alignContent: "center" }]}
//                     >
//                         <Text>{t("zeroingContent.Pitch")}</Text>
//                     </HelpButton>
//                     <FieldEditFloat //FIXME float
//                         {...(ZeroingFloatFields.cZeroWPitch as FieldEditFloatProps)}
//                         style={styles.input}
//                         right={<TextInput.Affix text={t("measure.degree")} />}
//                     />
//                 </View>
//                 <View style={styles.row}>
//                     <HelpButton
//                         helpContent={helpContent.cZeroPTemperature}
//                         style={[styles.label, { alignContent: "center" }]}
//                     >
//                         <Text>{t("zeroingContent.PowderTemperature")}</Text>
//                     </HelpButton>
//                     <FieldEditFloat //FIXME float
//                         {...(ZeroingFloatFields.cZeroPTemperature as FieldEditFloatProps)}
//                         style={styles.input}
//                         right={<TextInput.Affix text={t("measure.degree")} />}
//                     />
//                 </View>
//                 <View style={styles.row}>
//                     <HelpButton
//                         helpContent={helpContent.cZeroAirHumidity}
//                         style={[styles.label, { alignContent: "center" }]}
//                     >
//                         <Text>{t("zeroingContent.Humidity")}</Text>
//                     </HelpButton>
//                     <FieldEditFloat //FIXME float
//                         {...(ZeroingFloatFields.cZeroAirHumidity as FieldEditFloatProps)}
//                         style={styles.input}
//                         right={<TextInput.Affix text={t("measure.%")} />}
//                     />
//                 </View>
//             </View>
//         </ScrollView>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 16,
//         // gap: 8,
//         maxWidth: 500,
//     },
//     row: {
//         flexDirection: "row",
//         alignItems: "center",
//         justifyContent: "flex-start",
//         gap: 16,
//         marginBottom: 12,
//     },
//     label: {
//         flex: 1,
//         alignItems: "flex-start",
//     },
//     inputContainer: {
//         flex: 3,
//         flexDirection: "row",
//         gap: 8,
//     },
//     input: {
//         flex: 1,
//     },
//     extraInput: {
//         flex: 1, // Ensure extra fields also occupy available space
//     },
//     sectionTitle: {
//         flex: 1,
//         marginBottom: 4,
//     },
//     divider: {
//         flex: 3,
//     },
//     select: {
//         flex: 3,
//     },
//     distancesEditBtn: {
//         borderRadius: 4,
//         margin: 0,
//     },
//     column: {
//         flex: 1,
//     },
// });

// export default ZeroingContent;
