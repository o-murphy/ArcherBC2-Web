import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { IconSource } from "react-native-paper/lib/typescript/components/Icon";

export const MD3PaperIcon = ({ ...props }) => {
    return (
        <MaterialIcons mode="outlined" material="rounded" disabled {...props} />
    );
};

export const md3PaperIconSource = ({ ...props }): IconSource => {
    return (rest: any) => <MD3PaperIcon {...props} {...rest} />;
};
