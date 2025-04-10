import { StyleSheet } from "react-native";
import { Drawer } from "react-native-paper";
import { ThemedIconName, ThemedTabIcon } from "./tabIcons";


const drawerItems = [
    { label: 'Description', icon: "description", route: 'description' },
    { label: 'Rifle', icon: "rifle", route: 'rifle' },
    { label: 'Cartridge', icon: "cartridge", route: 'cartridge' },
    { label: 'Bullet', icon: "bullet", route: 'bullet' },
    { label: 'Zeroing', icon: "zeroing", route: 'zeroing' },
    { label: 'Distances', icon: "distances", route: 'distances' },
];

// Type for the navigation handler in the Sidebar component
type SideBarProps = {
    onNavigate: (route: string) => void;
    selectedRoute: string;
};

// Function to render the side drawer with navigation options
const renderSideDrawer = ({ onNavigate, selectedRoute }: SideBarProps) => (
    <Drawer.Section style={styles.sideBar}>
        {drawerItems.map(({ label, icon, route }) => (
            <Drawer.CollapsedItem
                key={route}
                style={styles.collapsedItem}
                label={label}
                focusedIcon={() => <ThemedTabIcon source={icon as ThemedIconName} size={40} />}
                unfocusedIcon={() => <ThemedTabIcon source={icon as ThemedIconName} size={40} />}
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