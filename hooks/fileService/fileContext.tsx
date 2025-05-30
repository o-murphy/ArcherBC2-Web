import React, {
    createContext,
    useState,
    useContext,
    ReactNode,
    useEffect,
} from "react";
import { FileHandleState } from "./useFileHandler";
import { Platform } from "react-native";
import { ParsedData, ProfileProps, saveParsedData } from "./useFileParsing";
import { toast } from "../../components/services/toastService/toastService";

// Define the context value type
interface FileContextType {
    fileState: FileHandleState;
    setFileState: React.Dispatch<React.SetStateAction<FileHandleState>>;
    currentData: ParsedData;
    setCurrentData: React.Dispatch<React.SetStateAction<ParsedData>>;
    backupData: ParsedData;
    setBackupData: React.Dispatch<React.SetStateAction<ParsedData>>;
    syncBackup: () => void;
    restoreBackup: () => void;

    dummyState: boolean; // This state will trigger re-renders
    setDummyState: React.Dispatch<React.SetStateAction<boolean>>; // Function to modify dummy state

    closeFile: (save?: boolean) => void;
    saveFile: () => void;

    fieldErrors: { [key: string]: boolean | null }; // Стан помилок для полів
    setFieldError: (field: keyof ProfileProps, error: boolean | null) => void;
}

// Define the props type for FileProvider
interface FileProviderProps {
    children: ReactNode;
}

// Create context with default values
const FileContext = createContext<FileContextType | undefined>(undefined);

const defaultState = { name: null, data: null, error: null };
const defaultData = { profile: null, error: null };

// Provider component to wrap around your app
export const FileProvider: React.FC<FileProviderProps> = ({ children }) => {
    const [fileState, setFileState] = useState<FileHandleState>(defaultState);
    const [currentData, setCurrentData] = useState<ParsedData>(defaultData);
    const [backupData, setBackupData] = useState<ParsedData>(defaultData);

    // Dummy state for forcing re-render
    const [dummyState, setDummyState] = useState<boolean>(false);

    const [fieldErrors, setFieldErrors] = useState<{ [key: string]: boolean | null }>({});


    if (currentData.profile) {
        console.log(currentData.profile);
    }

    useEffect(() => {
        if (currentData.profile && !backupData.profile) {
            syncBackup();
        }
    }, [currentData.profile]);

    useEffect(() => {
        if (Platform.OS !== "web") return;

        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            e.preventDefault();
            e.returnValue = "Input data can be lost";
        };

        if (currentData.profile !== null) {
            window.addEventListener("beforeunload", handleBeforeUnload);
        }

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [currentData.profile]);

    const syncBackup = () => {
        setBackupData(currentData);
    };

    // FIXME use backup and current diff status
    const restoreBackup = () => {
        setDummyState((prev) => !prev); // Increment dummyState to trigger re-render
        setCurrentData(backupData);
    };

    const saveFile = async () => {
        try {
            saveParsedData(currentData, fileState.name);
        } catch (error: any) {
            console.log(`Error on file download, ${error}`);
            toast.error(error);
        }
    };

    const closeFile = (save: boolean = false) => {
        if (save) {
            saveFile();
        }
        setBackupData(defaultData);
        setCurrentData(defaultData);
        setFileState(defaultState);
    };

    const setFieldError = (field: keyof ProfileProps, error: boolean | null) => {
        setFieldErrors((prevErrors) => ({ ...prevErrors, [field]: error }));
    };

    return (
        <FileContext.Provider
            value={{
                fileState,
                setFileState,
                currentData,
                setCurrentData,
                backupData,
                setBackupData,
                syncBackup,
                restoreBackup,
                dummyState,
                setDummyState,
                closeFile,
                saveFile,

                fieldErrors,
                setFieldError,
            }}
        >
            {children}
        </FileContext.Provider>
    );
};

// Custom hook to access file context
export const useFileContext = (): FileContextType => {
    const context = useContext(FileContext);
    if (!context) {
        throw new Error("useFileContext must be used within a FileProvider");
    }
    return context;
};
