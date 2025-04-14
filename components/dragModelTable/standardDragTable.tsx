import { BcType } from "@/utils/a7p/types";
import { FlatList, StyleSheet, View } from "react-native"
import { Card, IconButton, Text, Tooltip, useTheme } from "react-native-paper"
import { useFileField } from "../fieldsEdit/fieldEditInput";
import { CoefRow } from "@/utils/a7p/types";
import { useCallback, useMemo, useState } from "react";
import { ProfileProps } from "@/hooks/useFileParsing";
import { CustomDragRowProps, CustomRowField } from "./customDragTable";


const MAX_STANDARD_ITEM_COUNT = 5


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
    }
}


const StandardDragHeader = ({ model, onSortPress }: { model: BcType, onSortPress?: () => void }) => {
    return (
        <View style={styles.row}>
            <View style={styles.label}></View>
            <Text style={[styles.input, { textAlign: "center" }]}>{"Velocity, mps"}</Text>
            <Text style={[styles.input, { textAlign: "center" }]}>{`BC (${model})`}</Text>
            <Tooltip title="Sort" leaveTouchDelay={1}>
                <IconButton style={styles.icon} mode="outlined" icon="sort-variant" onPress={onSortPress} />
            </Tooltip>
            {/* <Button icon="sort-variant" mode="outlined" compact style={styles.sortBtn} onPress={onSortPress}>Sort</Button> */}

        </View>
    )
}


const StandardDragRow = ({ index, row: { velocity = 0, bc = 0 }, setRow }: CustomDragRowProps) => {
    const theme = useTheme()

    const clearRow = () => {
        setRow(0, 0)
    }

    const handleMvChange = (value: number) => {
        setRow(value, null)
    }

    const handleBcCdChange = (value: number) => {
        setRow(null, value)
    }

    return (
        <View style={styles.row}>
            <Text style={[styles.label, { textAlign: "left" }]}>{`[${index + 1}]`}</Text>
            <CustomRowField value={velocity} onValueChange={handleMvChange} {...FieldProps.mv} />
            <CustomRowField value={bc} onValueChange={handleBcCdChange} {...FieldProps.cd} />
            <Tooltip title="Clear row" leaveTouchDelay={1}>
                <IconButton size={16} icon={"close"} iconColor={theme.colors.error} style={styles.icon} onPress={clearRow} />
            </Tooltip>
        </View>
    )
}


const StandardDragTable = ({ model }: { model: BcType }) => {

    let field = 'coefRows' as keyof ProfileProps

    switch (model) {
        case BcType.G1:
            field = 'coefRowsG1'
            break
        case BcType.G7:
            field = 'coefRowsG7'
            break
    }

    const [err, setErr] = useState<Error | null>(null);
    const [value, setValue] = useFileField<keyof ProfileProps, CoefRow[]>({
        field,
        defaultValue: [],
        validate: useCallback(() => {
            return !!err
        }, [err])
    });

    const rows = useMemo(() => {
        let filledRows = value.slice(0, MAX_STANDARD_ITEM_COUNT)

        // If there are fewer than 5 rows, fill the rest with { bcCd: 0, mv: 0 }
        while (filledRows.length < MAX_STANDARD_ITEM_COUNT) {
            filledRows.push({ bcCd: 0, mv: 0 });
        }

        return filledRows.map((item, index) => ({
            id: `${index}`,
            bcCd: item.bcCd / 10000,
            mv: item.mv / 10
        }));
    }, [value, setValue]);

    const handleChange = (index: number, mv: number | null = null, bcCd: number | null = null) => {
        console.log('handle', !err)

        if (!err) {
            const newValue = [...value];  // Create a shallow copy of the value array
            while (newValue.length < MAX_STANDARD_ITEM_COUNT) {
                newValue.push({ bcCd: 0, mv: 0 });
            }
            newValue[index] = {
                ...newValue[index],  // Copy the existing row
                mv: mv !== null && mv >= 0 ? mv * 10 : newValue[index].mv,  // Ensure mv is not 0
                bcCd: bcCd != null && bcCd >= 0 ? bcCd * 10000 : newValue[index].bcCd
            };
            setValue(newValue)
        }
    }

    const onSortPress = () => {
        setValue(
            value.filter(row => !(row.bcCd === 0 && row.mv === 0)).sort((a, b) => b.mv - a.mv)
        )
    }

    const renderItem = (item: any) => {
        const index = item.index

        return (
            <StandardDragRow
                key={index}
                index={index}
                row={{
                    velocity: item.item.mv,
                    bc: item.item.bcCd
                }}
                setRow={
                    (mv = null, bc = null) => handleChange(index, mv, bc)
                }
            />
        )
    }

    return (
        <Card elevation={3} style={styles.surface}>
            <StandardDragHeader model={model} onSortPress={onSortPress} />
            <FlatList
                data={rows}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                initialNumToRender={10}
                scrollEnabled={true}
                style={{ flex: 1 }}
                contentContainerStyle={{ height: 300 }}
            />
        </Card>
    )
}


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
        gap: 8
    },
    row: {
        flexDirection: "row",
        gap: 8,
    },
    input: {
        flex: 3,
        height: 24
    },
    icon: {
        flex: 1,
    },
    sortBtn: {
        flex: 1,
        alignSelf: "flex-end"
    },
})

export default StandardDragTable