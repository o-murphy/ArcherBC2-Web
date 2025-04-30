import React from "react";
import { useTranslation } from "react-i18next";
import { Icon, IconButton, Surface, Text, useTheme } from "react-native-paper";
import { useSortable } from "@dnd-kit/sortable";
import { StyleSheet, View } from "react-native"; // Import TouchableWithoutFeedback
import { CSS } from "@dnd-kit/utilities";
import { ThemedIcon } from "@/components/icons/CustomIcons";
import { md3PaperIconSource } from "@/components/icons/MD3PaperIcons";
import { ToolTipIconButton } from "@/components/IconButtonWithTooltip";

export interface DistanceItemProps {
    id: string;
    value: number;
    zero: boolean;
};

interface SortableItemProps {
    item: DistanceItemProps;
    onRemovePress?: (item: DistanceItemProps) => void;
}

export const SortableItem = React.memo(({ item, onRemovePress = undefined }: SortableItemProps) => {
    const { t } = useTranslation();
    const theme = useTheme()
    const { attributes, listeners, setNodeRef, transform, transition }: any =
        useSortable({ id: item.id });

    const pressed = attributes["aria-pressed"] === true

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const surfaceStyle = {
        ...styles.sortableItem,
        ...style,
        borderWidth: pressed ? 2 : 0,
        borderColor: theme.colors.secondaryContainer,
    }

    const title = `${item.value} ${t("measure.m")}`;

    return (
        <Surface
            elevation={2}
            style={surfaceStyle}

        >
            <View
                style={styles.textContainer}
                ref={setNodeRef}
                {...attributes}
                {...listeners}
            >
                <Icon source={"arrow-up-down"} size={24} />
                <Text style={styles.titleText}>
                    {title}
                </Text>
                {item.zero && <Text style={styles.descriptionText}>
                    {t("distancesContent.ZeroDistance")}
                </Text>}
                {item.zero && <ThemedIcon size={24} source="zeroing-distance" />}
            </View>
            {
                onRemovePress
                && <ToolTipIconButton
                    tooltip={t("distancesContent.RemoveRow")}
                    icon={md3PaperIconSource({ name: "cancel" })}
                    iconColor={theme.colors.error}
                    onPress={() => onRemovePress?.(item)}
                />
            }
        </Surface >
    );
}, (prevProps, nextProps) => {
    // Only re-render if the item prop has changed
    return prevProps.item.id === nextProps.item.id
});


const styles = StyleSheet.create({
    clearButton: {
        padding: 8
    },
    sortableItem: {
        // width: 200,
        flexDirection: "row",
        borderRadius: 8,
        gap: 16,
        alignItems: 'center', // Added to vertically align items
    },
    textContainer: {
        padding: 20,
        flexDirection: "row",
        gap: 16,
        flex: 1,
        alignItems: 'center', // Added to vertically align items
    },
    closeIcon: {
        width: 16,
        height: 16,
        alignSelf: "flex-end"
    },
    titleText: {
        textAlign: "center",
        alignSelf: "center"
    },
    descriptionText: {
        textAlign: "center",
        alignSelf: "center",
        fontStyle: "italic"
    },
});