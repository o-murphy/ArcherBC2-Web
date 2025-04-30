import { FieldFloatProps, FieldProps } from "@/components/fieldsEdit/FieldEditInput";

export const DescriptionFields: FieldProps = {
    profileName: {
        field: "profileName",
        maxLength: 50,
    },
    shortNameTop: {
        field: "shortNameTop",
        maxLength: 8,
        label: "Top",
    },
    shortNameBot: {
        field: "shortNameBot",
        maxLength: 8,
        label: "Bot",
    },
    cartridgeName: {
        field: "cartridgeName",
        maxLength: 50,
    },
    bulletName: {
        field: "bulletName",
        maxLength: 50,
    },
    userNote: {
        field: "userNote",
        maxLength: 1024,
        multiline: true,
    },
};

export const CartridgeFields: FieldFloatProps = {
    cMuzzleVelocity: {
        field: "cMuzzleVelocity",
        range: { min: 1, max: 3000 },
        multiplier: 10,
        fraction: 0,
    },
    cZeroTemperature: {
        field: "cZeroTemperature",
        range: { min: -50, max: 50 },
        multiplier: 1,
        fraction: 0,
    },
    cTCoeff: {
        field: "cTCoeff",
        range: { min: 0, max: 100 },
        multiplier: 1000,
        fraction: 2,
    },
};

export const BulletFloatFields: FieldFloatProps = {
    bDiameter: {
        field: "bDiameter",
        range: { min: 0.01, max: 50 },
        multiplier: 1000,
        fraction: 3,
    },
    bWeight: {
        field: "bWeight",
        range: { min: 0.1, max: 30000 },
        multiplier: 10,
        fraction: 1,
    },
    bLength: {
        field: "bLength",
        range: { min: 0.01, max: 50 },
        multiplier: 1000,
        fraction: 3,
    },
};

export const RifleTextFields: FieldProps = {
    caliber: {
        field: "caliber",
        maxLength: 50,
    },
};

export const RifleFloatFields: FieldFloatProps = {
    rTwist: {
        field: "rTwist",
        range: { min: 0, max: 100 },
        multiplier: 100,
        fraction: 2,
    },
    scHeight: {
        field: "scHeight",
        range: { min: -5000, max: 5000 },
        multiplier: 1,
        fraction: 0,
    },
};

export const ZeroingFloatFields: FieldFloatProps = {
    zeroX: {
        field: "zeroX",
        range: { min: -200, max: 200 },
        multiplier: -1000,
        fraction: 2,
    },
    zeroY: {
        field: "zeroY",
        range: { min: -200, max: 200 },
        multiplier: 1000,
        fraction: 2,
    },

    cZeroWPitch: {
        field: "cZeroWPitch",
        range: { min: -90, max: 90 },
        multiplier: 1,
        fraction: 0,
    },

    cZeroAirTemperature: {
        field: "cZeroAirTemperature",
        range: { min: -50, max: 50 },
        multiplier: 1,
        fraction: 0,
    },
    cZeroPTemperature: {
        field: "cZeroPTemperature",
        range: { min: -50, max: 50 },
        multiplier: 1,
        fraction: 0,
    },
    cZeroAirPressure: {
        field: "cZeroAirPressure",
        range: { min: 0, max: 65535 },
        multiplier: 10,
        fraction: 0,
    },
    cZeroAirHumidity: {
        field: "cZeroAirHumidity",
        range: { min: 0, max: 100 },
        multiplier: 1,
        fraction: 0,
    },
};

export const DistancesFloatFields: FieldFloatProps = {
    distances: {  // readonly
        field: "distances",
        range: { min: 1, max: 3000 },
        multiplier: 1,
        fraction: 0,
    }
}