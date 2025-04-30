import React, { ReactNode, useEffect, useState } from "react";
import { StyleSheet } from "react-native";

import {
    CommonActions,
    NavigationContainer,
    NavigationProp,
    ParamListBase,
    RouteProp,
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomNavigation, Surface, Text, useTheme } from "react-native-paper";
import { ThemedIconName, ThemedTabIcon } from "../icons/CustomIcons";
import { useFileContext } from "@/hooks/fileService/fileContext";
import { TopBar } from "@/components/mobile/TopBar";
import { useTranslation } from "react-i18next";
import DescriptionContent from "@/components/contentCards/DescriptionContent";
import RifleContent from "@/components/contentCards/RifleContent";
import CartridgeContent from "@/components/contentCards/CartridgeContent";
import BulletContent from "@/components/contentCards/BulletContent";
import ZeroingContent from "@/components/contentCards/ZeroingContent";
import DistancesContent from "@/components/contentCards/distancesContent/DistancesContent";


const tabs = [
    {
        name: "sideBar.Description",
        content: DescriptionContent,
        helpContentKey: "DescriptionCard",
        icon: "description",
        checkFields: ["profileName", "shortNameTop", "shortNameBot", "cartridgeName", "bulletName", "userNote"]
    },
    {
        name: "sideBar.Rifle",
        content: RifleContent,
        helpContentKey: "RifleCard",
        icon: "rifle",
        checkFields: ["caliber", "rTwist", "scHeight", "twistDir"]
    },
    {
        name: "sideBar.Cartridge",
        content: CartridgeContent,
        helpContentKey: "CartridgeCard",
        icon: "cartridge",
        checkFields: ["cMuzzleVelocity", "cZeroTemperature", "cTCoeff"]
    },
    {
        name: "sideBar.Bullet",
        content: BulletContent,
        helpContentKey: "BulletCard",
        icon: "bullet",
        checkFields: ["bLength", "bWeight", "bDiameter", "bcType", "coefRows", "coefRowsG1", "coefRowsG7", "coefRowsCustom"]
    },
    {
        name: "sideBar.Zeroing",
        content: ZeroingContent,
        helpContentKey: "ZeroingCard",
        icon: "zeroing",
        checkFields: ["cZeroPTemperature", "cZeroAirTemperature", "cZeroAirHumidity", "cZeroAirPressure", "cZeroWPitch", "zeroX", "zeroY", "cZeroDistanceIdx"]
    },
    {
        name: "sideBar.Distances",
        content: DistancesContent,
        helpContentKey: "DistancesCard",
        icon: "distances",
        checkFields: ["distances"]
    },
];

type TabScreenProps = {
    title: string;
    helpContentKey: string;
    children: ReactNode;
    route: RouteProp<ParamListBase, string>;
    navigation: NavigationProp<ParamListBase>;
};

const TabScreen = ({ title, helpContentKey, children, route, navigation }: TabScreenProps) => {
    const { t } = useTranslation();
    // console.log(navigation);

    return (
        <Surface style={styles.tabContainerStyle}>
            <TopBar title={t(title)} helpContentKey={helpContentKey} />
            {children}
        </Surface>
    );
};

const Tab = createBottomTabNavigator();

export default function EditNav() {
    const theme = useTheme();
    const { t } = useTranslation();
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
            }}
            tabBar={({ navigation, state, descriptors, insets }) => (
                <BottomNavigation.Bar
                    style={{
                        height: 100,
                        backgroundColor: theme.colors.elevation.level2,
                    }} // matches your dark theme
                    activeIndicatorStyle={{ height: 48, marginTop: 16 }}
                    labeled={true}
                    navigationState={state}
                    safeAreaInsets={insets}
                    onTabPress={({ route, preventDefault }) => {
                        const event = navigation.emit({
                            type: "tabPress",
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (event.defaultPrevented) {
                            preventDefault();
                        } else {
                            navigation.dispatch({
                                ...CommonActions.navigate(
                                    route.name,
                                    route.params,
                                ),
                                target: state.key,
                            });
                        }
                    }}
                    renderIcon={({ route, focused, color }) => {
                        const { options } = descriptors[route.key];
                        if (options.tabBarIcon) {
                            return options.tabBarIcon({
                                focused,
                                color,
                                size: 40,
                            });
                        }
                        return null;
                    }}
                    getLabelText={({ route }: { route: any }) => {
                        const { options } = descriptors[route.key];
                        const label =
                            options.tabBarLabel !== undefined
                                ? options.tabBarLabel
                                : options.title !== undefined
                                    ? options.title
                                    : route.title;
                        return label;
                    }}
                    renderLabel={({
                        route,
                        focused,
                        color,
                    }: {
                        route: any;
                        focused: boolean;
                        color: any;
                    }) => {
                        const { options } = descriptors[route.key];
                        const label =
                            options.tabBarLabel !== undefined
                                ? options.tabBarLabel
                                : options.title !== undefined
                                    ? options.title
                                    : route.title;

                        return (
                            <Text
                                variant="labelSmall"
                                style={{
                                    textAlign: "center",
                                    marginTop: 16,
                                }}
                            >
                                {label}
                            </Text>
                        );
                    }}
                />
            )}
        >
            {tabs.map(({ name, content: Content, helpContentKey, icon }) => (
                <Tab.Screen
                    key={name}
                    name={name}
                    options={{
                        title: `ArcherBC2 | ${t(name)}`,
                        tabBarLabelPosition: "beside-icon",
                        tabBarLabel: t(name),
                        tabBarIcon: ({ ...props }) => (
                            <ThemedTabIcon
                                source={icon as ThemedIconName}
                                {...props}
                            />
                        ),
                    }}
                >
                    {(props) => (
                        <TabScreen title={name} helpContentKey={helpContentKey} {...props}>
                            <Content />
                        </TabScreen>
                    )}
                </Tab.Screen>
            ))}
        </Tab.Navigator>
    );
}

export const BottomNav = () => {
    const [visible, setVisible] = useState<boolean>(false);
    const { currentData } = useFileContext();

    useEffect(() => {
        if (currentData.profile) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    }, [currentData]);

    return (
        <Surface style={styles.tabContainerStyle}>
            {visible && (
                <NavigationContainer>
                    <EditNav />
                </NavigationContainer>
            )}
        </Surface>
    );
};

const styles = StyleSheet.create({
    tabContainerStyle: {
        flex: 1,
        justifyContent: "center",
        alignItems: "stretch",
    },
});
