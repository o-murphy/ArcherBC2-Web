import { ScrollView, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { useHelp } from "../help/helpContent";
import { HelpButton } from "../help/HelpIcons";
import { useTranslation } from "react-i18next";
import { ContentTitle } from "../ContentTitle";
import { DistancesListView } from "./DistancesList";
import { DistancesAdd } from "./DistanceAdd";
import { DistancesTemplates } from "./DistancesTemplates";


const DistancesContent = () => {
    const { t } = useTranslation();
    const helpContent = useHelp();

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <ContentTitle
                title={t("distancesContent.Distances")}
                helpKey="DistancesCard"
            />

            <HelpButton helpContent={helpContent.QuickRangeSet}>
                <Text style={styles.helpButton} variant="titleMedium">
                    {t("distancesContent.QuickRangeSet")}
                </Text>
            </HelpButton>

            <DistancesTemplates />
            <DistancesAdd />
            <DistancesListView />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    helpButton: {
        alignSelf: "center"
    },
    container: {
        flex: 1,
        padding: 16,
        maxWidth: 500,
        gap: 8
    },
});

export default DistancesContent;
