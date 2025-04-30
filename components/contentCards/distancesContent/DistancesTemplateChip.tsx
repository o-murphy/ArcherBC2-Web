import { useProfileFieldState } from "@/components/fieldsEdit/FieldEditInput";
import { ProfileProps } from "@/hooks/fileService/useFileParsing";
import { useTranslation } from "react-i18next";
import { Chip } from "react-native-paper";

export const DistancesTemplateChip = ({
    name,
    distances,
}: {
    name: string;
    distances: number[];
}) => {
    const { t } = useTranslation();

    const [, setValue] = useProfileFieldState<keyof ProfileProps, number[]>({
        field: "distances",
        defaultValue: [],
    });

    const onPress = () => {
        setValue(distances.map((item) => Math.round(item * 100)));
    };

    return (
        <Chip mode="flat" onPress={onPress}>
            {`${name}${t("measure.m")}`}
        </Chip>
    );
};