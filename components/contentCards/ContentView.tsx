// components/Content.tsx
import React from "react";
import { ScrollView, StyleSheet, ViewStyle } from "react-native";
import { Surface } from "react-native-paper";

type ContentProps = {
    children: React.ReactNode;
    style?: ViewStyle;
};

const ContentCard: React.FC<ContentProps> = ({ children, style }) => {
    return (
        <Surface style={[styles.surface, style]}>
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
            >
                {children}
            </ScrollView>
        </Surface>
    );
};

const styles = StyleSheet.create({
    surface: {
        flex: 1,
        borderRadius: 16,
        padding: 24,
        overflow: "hidden", // Important for rounded corners
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        paddingBottom: 24,
    },
});

export default ContentCard;
