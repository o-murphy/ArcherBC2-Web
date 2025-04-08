import protobuf from 'protobufjs';
import CryptoJS from 'crypto-js';
import { Linking, Platform } from 'react-native';

type FetchProfileArgs = {
    path?: string;
    onSuccess?: (result: any) => void;
    onError?: () => void;
}

// Path to your protobuf file
const PUBLIC_PATH = __DEV__ ? '/' : '/a7pIndex/'
const PROTO_URL = PUBLIC_PATH + 'proto/profedit.proto';
const MD5_LENGTH = 32;


export interface ProfileProps {
    bDiameter: number;
    bLength: number;
    bWeight: number;
    bcType: string;
    bulletName: string;
    cMuzzleVelocity: number;
    cTCoeff: number;
    cZeroAirHumidity: number;
    cZeroAirPressure: number;
    cZeroAirTemperature: number;
    cZeroDistanceIdx: number;
    cZeroPTemperature: number;
    cZeroTemperature: number;
    cZeroWPitch: number;
    caliber: string;
    cartridgeName: string;
    coefRows: any[];
    deviceUuid: string;
    distances: number[];
    profileName: string;
    rTwist: number;
    scHeight: number;
    shortNameBot: string;
    shortNameTop: string;
    switches: any[];
    twistDir: string;
    userNote: string;
    zeroX: number;
    zeroY: number;

    // zeroDistance?: number;
}

let cachedRoot: protobuf.Root | null = null;

// Retry parameters
const MAX_RETRIES = 3; // Maximum number of retries
const RETRY_DELAY = 1000; // Delay between retries in milliseconds (1 second)

async function loadProtobufSchemaWithRetry(url: string, retries: number = 0): Promise<protobuf.Root> {
    try {
        return await protobuf.load(url);
    } catch (error) {
        console.error(`Failed to load protobuf schema (attempt ${retries + 1}/${MAX_RETRIES}):`, error);

        if (retries < MAX_RETRIES) {
            // Wait for a delay before retrying
            await new Promise(resolve => setTimeout(resolve, RETRY_DELAY * Math.pow(2, retries))); // Exponential backoff
            return loadProtobufSchemaWithRetry(url, retries + 1);
        } else {
            throw new Error("Error loading protobuf schema after several attempts");
        }
    }
}

// Utility function to convert array buffer to base64
export function bufferToBase64(buffer: any): string {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
};

// MD5 hash function using Node.js crypto module
export function md5(data: any) {
    // Convert binary string to WordArray for CryptoJS
    const wordArray = CryptoJS.enc.Latin1.parse(data);
    // Calculate MD5 hash and return as hexadecimal string
    const hash = CryptoJS.MD5(wordArray);
    return hash.toString(CryptoJS.enc.Hex);
};

export default async function parseA7P(arrayBuffer: any): Promise<ProfileProps> {
    const base64 = bufferToBase64(arrayBuffer);
    const binaryData = atob(base64);
    const md5Checksum = binaryData.slice(0, MD5_LENGTH);
    const actualData = binaryData.slice(MD5_LENGTH);

    const calculatedChecksum = md5(actualData);

    if (md5Checksum !== calculatedChecksum) {
        console.error("Invalid A7P file checksum");
        throw new Error("Invalid A7P file checksum");
    }

    // Use the cached protobuf schema if it is already loaded
    if (!cachedRoot) {
        try {
            cachedRoot = await loadProtobufSchemaWithRetry(PROTO_URL);  // Load with retries
        } catch (error) {
            console.error("Failed to load protobuf schema:", error);
            throw new Error("Error loading protobuf schema after retries");
        }
    }

    const Payload = cachedRoot.lookupType('profedit.Payload');

    try {
        const uint8ArrayData = new Uint8Array(actualData.split('').map(char => char.charCodeAt(0)));
        const payload = Payload.decode(uint8ArrayData);
        const payloadObject = Payload.toObject(payload, {
            longs: Number,
            enums: String,
            bytes: String,
            defaults: true,
            arrays: true
        });
        const profile: ProfileProps = payloadObject.profile;
        return profile;
    } catch (error) {
        console.error(error);
        throw new Error(`Error decoding payload`);
    }
}

// export default async function parseA7P(arrayBuffer: any): Promise<ProfileProps> {
//     const base64 = bufferToBase64(arrayBuffer);
//     const binaryData = atob(base64);
//     const md5Checksum = binaryData.slice(0, MD5_LENGTH);
//     const actualData = binaryData.slice(MD5_LENGTH);

//     const calculatedChecksum = md5(actualData);

//     if (md5Checksum !== calculatedChecksum) {
//         console.error("Invalid A7P file checksum")
//         throw new Error("Invalid A7P file checksum")
//     }

//     const root = await protobuf.load(PROTO_URL);
//     const Payload = root.lookupType('profedit.Payload');

//     try {
//         const uint8ArrayData = new Uint8Array(actualData.split('').map(char => char.charCodeAt(0)));
//         const payload = Payload.decode(uint8ArrayData);
//         const payloadObject = Payload.toObject(payload, {
//             longs: Number,
//             enums: String,
//             bytes: String,
//             defaults: true,
//             arrays: true
//         });
//         const profile: ProfileProps = payloadObject.profile
//         return profile
//     } catch (error) {
//         console.error(error)
//         throw new Error(`Error decoding payload`);
//     }

// };

export const fetchDetails = async ({ path, onSuccess, onError }: FetchProfileArgs) => {
    console.log(path)
    const fileUrl = PUBLIC_PATH + path; // Path to the file in the public directory
    try {
        const response = await fetch(fileUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const buf = await response.arrayBuffer();
        const result = await parseA7P(buf);
        console.log(result)
        onSuccess?.(result)
    } catch (error) {
        console.error("Error fetching file:", error);
        onError?.()
    }
}

export const downloadProfile = (path?: string) => {
    if (!path) {
        console.log("Undefined path")
        return
    }

    const fileUrl = PUBLIC_PATH + path;

    if (Platform.OS === "web") {
        const anchor = document.createElement("a");
        anchor.href = fileUrl;

        const dwnld = fileUrl.split("/").pop()
        if (dwnld) {
            anchor.download = dwnld;
            document.body.appendChild(anchor);
            anchor.click();
            document.body.removeChild(anchor);
        }
    } else {
        // Open the file URL in the browser for native platforms
        Linking.openURL(fileUrl);
    }
}
