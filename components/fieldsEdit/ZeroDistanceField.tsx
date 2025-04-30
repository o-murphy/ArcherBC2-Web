import { useMemo } from "react";
import { View } from "react-native";
import { TextInput } from "react-native-paper";
import { Dropdown } from "react-native-paper-dropdown";
import { useFileContext } from "@/hooks/fileService/fileContext";
import { useTranslation } from "react-i18next";

interface DistanceOption {
    label: string;
    value: string;
}

const renderInputIcon = () => {
    return <TextInput.Icon icon="menu-down" disabled />;
};

const ZeroDistanceField = ({ ...props }) => {
    const { t } = useTranslation();

    const {
        currentData: parsedData,
        setCurrentData: setParsedData,
        dummyState,
    } = useFileContext();

    const distances: DistanceOption[] = useMemo(() => {
        if (parsedData.profile?.distances) {
            return parsedData.profile.distances.map(
                (item: number, index: number) => ({
                    label: `${item / 100} ${t("measure.m")}`,
                    value: index.toString(),
                }),
            );
        }
        return [];
    }, [parsedData, dummyState]);

    const zeroDistanceIdx: string = useMemo(
        () => (parsedData.profile?.cZeroDistanceIdx ?? 0).toString(),
        [parsedData, dummyState],
    );

    const handleZeroDistanceChange = (value?: string | undefined) => {
        if (value === undefined) return; // Skip if value is missing
        if (!parsedData.profile) return; // Ensure profile exists before updating

        const intValue = parseInt(value, 10);
        if (parsedData.profile.cZeroDistanceIdx === intValue) return; // No need to update if value is unchanged

        setParsedData({
            ...parsedData,
            profile: {
                ...parsedData.profile, // Spread existing profile fields
                cZeroDistanceIdx: intValue, // Update only the index
            },
        });
    };

    const selectedLabel =
        distances.find((d) => d.value === zeroDistanceIdx)?.label ?? "";

    return (
        <View style={props.style}>
            <Dropdown
                placeholder={t("zeroDistanceField.SelectZeroingDistance")}
                options={distances}
                value={zeroDistanceIdx}
                onSelect={handleZeroDistanceChange}
                hideMenuHeader
                maxMenuHeight={400}
                CustomDropdownInput={(props) => (
                    <TextInput
                        {...props}
                        dense
                        mode="outlined"
                        value={selectedLabel}
                        right={renderInputIcon()}
                    />
                )}
            />
        </View>
    );
};

export default ZeroDistanceField;
