import { IconButton, IconButtonProps, Tooltip } from "react-native-paper";

export interface ToolTipIconButtonProps extends IconButtonProps {
    tooltip: string;
}

export const ToolTipIconButton = ({
    tooltip,
    ...props
}: ToolTipIconButtonProps) => {
    return (
        <Tooltip title={tooltip} leaveTouchDelay={0.2}>
            <IconButton {...props} />
        </Tooltip>
    );
};
