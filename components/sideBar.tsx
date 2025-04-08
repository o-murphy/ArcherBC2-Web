import { StyleSheet, View } from "react-native";
import { Drawer, Icon, useTheme } from "react-native-paper";
import { IconSource } from "react-native-paper/lib/typescript/components/Icon";
import { TabRifleIcon, TabBulletIcon, TabCartridgeIcon, TabDescriptionIcon, TabDistancesIcon, TabZeroingIcon } from "./tabIcons";

const drawerItems = [
    { label: 'Description', icon: TabDescriptionIcon, route: 'description' },
    { label: 'Rifle', icon: TabRifleIcon, route: 'rifle' },
    { label: 'Cartridge', icon: TabCartridgeIcon, route: 'cartridge' },
    { label: 'Bullet', icon: TabBulletIcon, route: 'bullet' },
    { label: 'Zeroing', icon: TabZeroingIcon, route: 'zeroing' },
    { label: 'Distances', icon: TabDistancesIcon, route: 'distances' },
];

// Type for the navigation handler in the Sidebar component
type SideBarProps = {
    onNavigate: (route: string) => void;
    selectedRoute: string;
};

const ThemedTabIcon = ({ source, size }: { source: IconSource, size: number }) => {
    const theme = useTheme()
    const style = {
        borderRadius: size,
        backgroundColor: !theme.dark ? theme.colors.onSurfaceVariant : undefined
    }
    return (
        <View style={style}>
            <Icon source={source} size={size} />
        </View>
    )
}

// Function to render the side drawer with navigation options
const renderSideDrawer = ({ onNavigate, selectedRoute }: SideBarProps) => (
    <Drawer.Section style={styles.sideBar}>
        {drawerItems.map(({ label, icon, route }) => (
            <Drawer.CollapsedItem
                key={route}
                style={styles.collapsedItem}
                label={label}
                focusedIcon={() => <ThemedTabIcon source={icon} size={40} />}
                unfocusedIcon={() => <ThemedTabIcon source={icon} size={40} />}
                onPress={() => onNavigate?.(route)}
                active={selectedRoute === route}
            />
        ))}
    </Drawer.Section>
);

export function SideBar({ onNavigate, selectedRoute }: SideBarProps) {
    return renderSideDrawer({ onNavigate, selectedRoute });
}


const styles = StyleSheet.create({
    sideBar: {
        alignItems: "center",
        width: 64,
        borderRadius: 16,
    },
    collapsedItem: {
        width: 64,
        height: 48,
        borderRadius: 16,
    }
})


export default SideBar;