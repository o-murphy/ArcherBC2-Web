import React from "react";
import { useTranslation } from "react-i18next";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

const CartridgeHelpContent = () => {
    const { t } = useTranslation();
    return (
        <View style={styles.container}>
            <Text variant="bodyMedium" style={styles.description}>
                {/* {t('CartridgeHelpContent.Description is the base ballistic profile metadata')} */}
                ""
            </Text>

            <View style={styles.item}>
                <Text variant="labelLarge" style={styles.label}>
                    {t("cartridgeContent.MuzzleVelocity")}
                </Text>
                <Text variant="bodyMedium" style={styles.text}>
                    {/* {t('CartridgeHelpContent.The name of the ballistic profile as it appears in the device’s "Rifles" menu.')} */}
                    ""
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    description: {
        marginBottom: 20,
    },
    item: {
        marginBottom: 16,
    },
    label: {
        marginBottom: 4,
    },
    text: {
        lineHeight: 20,
        paddingLeft: 16,
    },
});

export default CartridgeHelpContent;
