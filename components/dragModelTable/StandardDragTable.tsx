import { FlatList, StyleSheet, View } from "react-native";
import {
    Card,
    HelperText,
    IconButton,
    Text,
    Tooltip,
    useTheme,
} from "react-native-paper";
import { useProfileFieldState } from "../fieldsEdit/FieldEditInput";
import { CoefRow, BcType } from "a7p-js/dist/types";
import { useEffect, useMemo, useState } from "react";
import { ProfileProps } from "@/hooks/fileService/useFileParsing";
import { CustomDragRowProps, CustomRowField } from "./CustomDragTable";
import { HelpButton } from "../contentCards/help/HelpIcons";
import { useHelp } from "../contentCards/help/helpContent";
import { useTranslation } from "react-i18next";
import { ToolTipIconButton } from "../IconButtonWithTooltip";
import { md3PaperIconSource } from "../icons/MD3PaperIcons";

const MAX_STANDARD_ITEM_COUNT = 5;

const FieldProps = {
    mv: {
        range: { min: 0, max: 3000 },
        fraction: 0,
        // affixText: "mps"
    },
    cd: {
        range: { min: 0, max: 10 },
        fraction: 3,
        // affixText: ""
    },
};

const StandardDragHeader = ({
    model,
    onSortPress,
}: {
    model: BcType;
    onSortPress?: () => void;
}) => {
    const { t } = useTranslation();
    const helpContent = useHelp();

    return (
        <View style={styles.row}>
            <HelpButton
                helpContent={helpContent.StandardDragModel}
                style={[styles.label, { alignContent: "center" }]}
            ></HelpButton>
            <Text style={[styles.input, { textAlign: "center" }]}>
                {"Velocity, mps"}
            </Text>
            <Text
                style={[styles.input, { textAlign: "center" }]}
            >{`BC (${model})`}</Text>
            <ToolTipIconButton
                tooltip={t("standardDragTable.Sort")}
                icon={md3PaperIconSource({ name: "sort" })}
                style={styles.icon}
                mode="outlined"
                onPress={onSortPress}
            />
        </View>
    );
};

const StandardDragRow = ({
    index,
    row: { velocity = 0, bc = 0 },
    setRow,
}: CustomDragRowProps) => {
    const theme = useTheme();
    const { t } = useTranslation();

    const clearRow = () => {
        setRow(0, 0);
    };

    const handleMvChange = (value: number) => {
        setRow(value, null);
    };

    const handleBcCdChange = (value: number) => {
        setRow(null, value);
    };

    return (
        <View style={styles.row}>
            <Text
                style={[styles.label, { textAlign: "center" }]}
            >{`${index + 1}.`}</Text>
            <CustomRowField
                value={velocity}
                onValueChange={handleMvChange}
                {...FieldProps.mv}
            />
            <CustomRowField
                value={bc}
                onValueChange={handleBcCdChange}
                {...FieldProps.cd}
            />
            <ToolTipIconButton
                tooltip={t("standardDragTable.ClearRow")}
                size={16}
                icon={md3PaperIconSource({ name: "cancel" })}
                iconColor={theme.colors.error}
                style={styles.icon}
                onPress={clearRow}
            />
        </View>
    );
};

const StandardDragTable = ({ model }: { model: BcType }) => {
    let field = "coefRows" as keyof ProfileProps;
    const { t } = useTranslation();

    switch (model) {
        case BcType.G1:
            field = "coefRowsG1";
            break;
        case BcType.G7:
            field = "coefRowsG7";
            break;
    }

    const [value, setValue] = useProfileFieldState<
        keyof ProfileProps,
        CoefRow[]
    >({
        field,
        defaultValue: [],
    });

    const [err, setErr] = useState<string | null>(null);

    const rows = useMemo(() => {
        let filledRows = value.slice(0, MAX_STANDARD_ITEM_COUNT);

        // If there are fewer than 5 rows, fill the rest with { bcCd: 0, mv: 0 }
        while (filledRows.length < MAX_STANDARD_ITEM_COUNT) {
            filledRows.push({ bcCd: 0, mv: 0 });
        }

        return filledRows.map((item, index) => ({
            id: `${index}`,
            bcCd: item.bcCd / 10000,
            mv: item.mv / 10,
        }));
    }, [value, setValue]);

    useEffect(() => {
        const validRows = value.filter((row) => row.bcCd > 0);
        const mvSet = new Set(validRows.map((row) => row.mv));

        if (validRows.length < 1) {
            setErr(
                t("standardDragTable.Should have at least 1 row with BC > 0"),
            );
        } else if (mvSet.size < validRows.length) {
            setErr(
                t(
                    "standardDragTable.Velocity values must be unique among rows with BC > 0",
                ),
            );
        } else {
            setErr(null);
        }
    }, [value, setValue]);

    const handleChange = (
        index: number,
        mv: number | null = null,
        bcCd: number | null = null,
    ) => {
        const newValue = [...value]; // Create a shallow copy of the value array
        while (newValue.length < MAX_STANDARD_ITEM_COUNT) {
            newValue.push({ bcCd: 0, mv: 0 });
        }
        newValue[index] = {
            ...newValue[index], // Copy the existing row
            mv:
                mv !== null && mv >= 0
                    ? Math.round(mv * 10)
                    : newValue[index].mv, // Ensure mv is not 0
            bcCd:
                bcCd != null && bcCd >= 0
                    ? Math.round(bcCd * 10000)
                    : newValue[index].bcCd,
        };
        setValue(newValue);
    };

    const onSortPress = () => {
        setValue(
            value
                .filter((row) => !(row.bcCd === 0 && row.mv === 0))
                .sort((a, b) => b.mv - a.mv),
        );
    };

    const renderItem = (item: any) => {
        const index = item.index;

        return (
            <StandardDragRow
                key={index}
                index={index}
                row={{
                    velocity: item.item.mv,
                    bc: item.item.bcCd,
                }}
                setRow={(mv = null, bc = null) => handleChange(index, mv, bc)}
            />
        );
    };

    return (
        <Card elevation={3} style={styles.surface}>
            <HelperText
                visible={!!err}
                type="error"
                style={{ alignSelf: "center" }}
            >
                {err}
            </HelperText>
            <StandardDragHeader model={model} onSortPress={onSortPress} />
            <FlatList
                data={rows}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                initialNumToRender={10}
                scrollEnabled={true}
                style={{ flex: 1 }}
            // contentContainerStyle={{ maxHeight: 300 }}
            />
        </Card>
    );
};

const styles = StyleSheet.create({
    label: {
        flex: 1,
        height: 24,
        textAlign: "right",
        alignSelf: "center",
    },
    surface: {
        flex: 1,
        padding: 16,
        gap: 8,
    },
    row: {
        flexDirection: "row",
        gap: 8,
    },
    input: {
        flex: 3,
        height: 24,
    },
    icon: {
        flex: 1,
    },
    sortBtn: {
        flex: 1,
        alignSelf: "flex-end",
    },
});

export default StandardDragTable;
