import { DarkThemeIcon as GeneratedDarkIcons, LightThemeIcon as GeneratedLightIcons } from './generatedIcons';
import { Icon, useTheme } from 'react-native-paper';
import { View } from 'react-native';

// Define the type for icon names to restrict valid keys
export type ThemedIconName =
    | "bullet"
    | "cartridge"
    | "description"
    | "distances"
    | "rifle"
    | "zeroing"
    | "zeroing-distance";

// Map the generated Base64 strings to ImageSourcePropType (for <Icon source>)
const mapBase64ToIconSource = (icons: Record<string, string>): Record<ThemedIconName, string> => {
    const mappedIcons: Record<ThemedIconName, string> = {
        bullet: icons['tab-icon-bullet'],
        cartridge: icons['tab-icon-cartridge'],
        description: icons['tab-icon-description'],
        distances: icons['tab-icon-distances'],
        rifle: icons['tab-icon-rifle'],
        zeroing: icons['tab-icon-zeroing'],
        'zeroing-distance': icons['zeroing-dist-icon'],
    };
    return mappedIcons;
};

// Icon objects using the generated Base64 strings
export const DarkThemeIcon: Record<ThemedIconName, string> = mapBase64ToIconSource(GeneratedDarkIcons);
export const LightThemeIcon: Record<ThemedIconName, string> = mapBase64ToIconSource(GeneratedLightIcons);

// Props for the ThemedTabIcon component
export interface ThemedCustomIconProps {
    source: ThemedIconName;
    size: number;
    color?: string; // Add color prop as it's used by <Icon>
    [key: string]: any; // Allow other props from Icon component
}

export const ThemedIcon = ({
    source,
    size,
    color,
    ...props
}: ThemedCustomIconProps) => {
    const theme = useTheme();
    const iconsSet = theme.dark ? DarkThemeIcon : LightThemeIcon;
    const iconSource = iconsSet[source];

    return <Icon source={{ uri: iconSource }} size={size} color={color} {...props} />;
};

export const ThemedTabIcon = ({
    source,
    size,
    color,
    ...props
}: ThemedCustomIconProps) => {
    const theme = useTheme();
    const containerStyle = {
        borderRadius: size,
        // backgroundColor: !theme.dark ? theme.colors.onSurfaceVariant : undefined,
    };

    return (
        <View style={containerStyle}>
            <ThemedIcon source={source} size={size} color={color} {...props} />
        </View>
    );
};