import { MD3DarkTheme, MD3LightTheme } from "react-native-paper"



const lightColors = {
    "primary": "rgb(73, 104, 13)",
    "onPrimary": "rgb(255, 255, 255)",
    "primaryContainer": "rgb(201, 240, 135)",
    "onPrimaryContainer": "rgb(19, 31, 0)",
    "secondary": "rgb(77, 103, 7)",
    "onSecondary": "rgb(255, 255, 255)",
    "secondaryContainer": "rgb(205, 239, 132)",
    "onSecondaryContainer": "rgb(20, 31, 0)",
    "tertiary": "rgb(124, 88, 0)",
    "onTertiary": "rgb(255, 255, 255)",
    "tertiaryContainer": "rgb(255, 222, 167)",
    "onTertiaryContainer": "rgb(39, 25, 0)",
    "error": "rgb(186, 26, 26)",
    "onError": "rgb(255, 255, 255)",
    "errorContainer": "rgb(255, 218, 214)",
    "onErrorContainer": "rgb(65, 0, 2)",
    "background": "rgb(254, 252, 244)",
    "onBackground": "rgb(27, 28, 24)",
    "surface": "rgb(254, 252, 244)",
    "onSurface": "rgb(27, 28, 24)",
    "surfaceVariant": "rgb(226, 228, 212)",
    "onSurfaceVariant": "rgb(69, 72, 61)",
    "outline": "rgb(117, 120, 108)",
    "outlineVariant": "rgb(197, 200, 185)",
    "shadow": "rgb(0, 0, 0)",
    "scrim": "rgb(0, 0, 0)",
    "inverseSurface": "rgb(48, 49, 44)",
    "inverseOnSurface": "rgb(242, 241, 233)",
    "inversePrimary": "rgb(174, 211, 110)",
    "elevation": {
        "level0": "transparent",
        "level1": "rgb(245, 245, 232)",
        "level2": "rgb(240, 240, 226)",
        "level3": "rgb(234, 236, 219)",
        "level4": "rgb(232, 234, 216)",
        "level5": "rgb(229, 231, 212)"
    },
    "surfaceDisabled": "rgba(27, 28, 24, 0.12)",
    "onSurfaceDisabled": "rgba(27, 28, 24, 0.38)",
    "backdrop": "rgba(46, 50, 39, 0.4)"
}

const darkColors = {
    "primary": "rgb(174, 211, 110)",
    "onPrimary": "rgb(35, 54, 0)",
    "primaryContainer": "rgb(53, 78, 0)",
    "onPrimaryContainer": "rgb(201, 240, 135)",
    "secondary": "rgb(178, 210, 107)",
    "onSecondary": "rgb(38, 53, 0)",
    "secondaryContainer": "rgb(56, 78, 0)",
    "onSecondaryContainer": "rgb(205, 239, 132)",
    "tertiary": "rgb(247, 189, 72)",
    "onTertiary": "rgb(65, 45, 0)",
    "tertiaryContainer": "rgb(94, 66, 0)",
    "onTertiaryContainer": "rgb(255, 222, 167)",
    "error": "rgb(255, 180, 171)",
    "onError": "rgb(105, 0, 5)",
    "errorContainer": "rgb(147, 0, 10)",
    "onErrorContainer": "rgb(255, 180, 171)",
    "background": "rgb(27, 28, 24)",
    "onBackground": "rgb(228, 227, 219)",
    "surface": "rgb(27, 28, 24)",
    "onSurface": "rgb(228, 227, 219)",
    "surfaceVariant": "rgb(69, 72, 61)",
    "onSurfaceVariant": "rgb(197, 200, 185)",
    "outline": "rgb(143, 146, 132)",
    "outlineVariant": "rgb(69, 72, 61)",
    "shadow": "rgb(0, 0, 0)",
    "scrim": "rgb(0, 0, 0)",
    "inverseSurface": "rgb(228, 227, 219)",
    "inverseOnSurface": "rgb(48, 49, 44)",
    "inversePrimary": "rgb(73, 104, 13)",
    "elevation": {
        "level0": "transparent",
        "level1": "rgb(34, 37, 28)",
        "level2": "rgb(39, 43, 31)",
        "level3": "rgb(43, 48, 34)",
        "level4": "rgb(45, 50, 34)",
        "level5": "rgb(48, 54, 36)"
    },
    "surfaceDisabled": "rgba(228, 227, 219, 0.12)",
    "onSurfaceDisabled": "rgba(228, 227, 219, 0.38)",
    "backdrop": "rgba(46, 50, 39, 0.4)"
}

export const ArmyDarkTheme = {
    ...MD3DarkTheme,
    colors: {
        ...MD3DarkTheme.colors,
        // ...lightColors,
        ...darkColors,
    }
}

export const ArmyLightTheme = {
    ...MD3LightTheme,
    colors: {
        ...MD3LightTheme.colors,
        // ...darkColors,
        ...lightColors,
    }
}