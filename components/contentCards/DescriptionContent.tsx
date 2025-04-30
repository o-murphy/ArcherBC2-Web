import { ScrollView, StyleSheet, View } from "react-native";
import { Text, Divider } from "react-native-paper";
import { FieldEdit, FieldEditProps } from "../fieldsEdit/FieldEditInput";
import { HelpButton } from "./help/HelpIcons";
import { useHelp } from "./help/helpContent";
import { DescriptionFields } from "./FieldProps";
import { useTranslation } from "react-i18next";
import { ContentTitle } from "./ContentTitle";

interface FormFieldProps {
    labelKey: string;
    helpKey: string;
    fieldProps: FieldEditProps;
    extraFields?: FieldEditProps[];
    placeholder?: string;
}

const FormField: React.FC<FormFieldProps> = ({
    labelKey,
    helpKey,
    fieldProps,
    extraFields,
    placeholder,
}) => {
    const { t } = useTranslation();
    const helpContent = useHelp();

    return (
        <View style={styles.row}>
            <HelpButton helpContent={helpContent[helpKey]} style={styles.label}>
                <Text>{t(labelKey)}</Text>
            </HelpButton>
            <View style={styles.inputContainer}>
                <FieldEdit
                    {...fieldProps}
                    style={styles.input}
                    placeholder={placeholder}
                />
                {extraFields?.map((field, index) => (
                    <FieldEdit
                        {...field}
                        style={[styles.input, styles.extraInput]}
                        key={index}
                    />
                ))}
            </View>
        </View>
    );
};

const DescriptionContent = () => {
    const { t } = useTranslation();

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <ContentTitle
                title={t("descriptionContent.Description")}
                helpKey="DescriptionCard"
            />

            <FormField
                labelKey="descriptionContent.Name"
                helpKey="profileName"
                fieldProps={DescriptionFields.profileName as FieldEditProps}
            />

            <FormField
                labelKey="descriptionContent.Hints"
                helpKey="ShortHints"
                fieldProps={{
                    ...(DescriptionFields.shortNameTop as FieldEditProps),
                    label: t("descriptionContent.Top"),
                }}
                extraFields={[
                    {
                        ...(DescriptionFields.shortNameBot as FieldEditProps),
                        label: t("descriptionContent.Bot"),
                    },
                ]}
            />

            <View style={styles.row}>
                <Text variant="titleMedium" style={styles.sectionTitle}>
                    {t("descriptionContent.Projectile")}
                </Text>
                <Divider style={styles.divider} />
            </View>

            <FormField
                labelKey="descriptionContent.Cartridge"
                helpKey="cartridgeName"
                fieldProps={DescriptionFields.cartridgeName as FieldEditProps}
            />

            <FormField
                labelKey="descriptionContent.Bullet"
                helpKey="bulletName"
                fieldProps={DescriptionFields.bulletName as FieldEditProps}
            />

            <View style={styles.row}>
                <HelpButton
                    helpContent={useHelp().userNote}
                    style={styles.sectionTitle}
                >
                    <Text variant="titleMedium">
                        {t("descriptionContent.UserNote")}
                    </Text>
                </HelpButton>
                <Divider style={styles.divider} />
            </View>

            <View style={styles.row}>
                <FieldEdit
                    {...(DescriptionFields.userNote as FieldEditProps)}
                    style={styles.input}
                    placeholder={t(
                        "descriptionContent.AddYourProfileSpecificNotesHere",
                    )}
                />
            </View>
        </ScrollView >
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
});

export default DescriptionContent;
