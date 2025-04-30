import { useFileContext } from "@/hooks/fileService/fileContext";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { HelperText, TextInput, TextInputProps } from "react-native-paper";
import { SpinBoxProps } from "./DoubleSpinBox";
import { View, ViewStyle } from "react-native";
import { ProfileProps } from "@/hooks/fileService/useFileParsing";
import { LocalizedSpinBox } from "./LocalizedSpinBox";

export function useProfileFields<K extends keyof ProfileProps>(
    fields: K[],
): [Pick<ProfileProps, K>, (updates: Partial<Pick<ProfileProps, K>>) => void] {
    const { currentData, setCurrentData } = useFileContext();

    const currentValues = useMemo(() => {
        const profile = (currentData.profile ?? {}) as Partial<ProfileProps>;
        const result = {} as Pick<ProfileProps, K>;
        for (const key of fields) {
            result[key] = profile[key] as ProfileProps[K];
        }
        return result;
    }, [currentData.profile, ...fields]);

    const setValues = (updates: Partial<Pick<ProfileProps, K>>) => {
        setCurrentData((prev) => ({
            ...prev,
            profile: {
                ...(prev.profile ?? {}),
                ...updates,
            } as ProfileProps,
        }));
    };

    return [currentValues, setValues];
}

export function useProfileFieldState<
    K extends keyof ProfileProps,
    T = ProfileProps[K],
>({
    field,
    defaultValue,
    parse = (v: any) => v,
    format = (v: T) => v,
    validate,
}: {
    field: K;
    defaultValue: T;
    parse?: (v: any) => T;
    format?: (v: T) => any;
    validate?: (v: T) => boolean;
}) {
    const { currentData, setCurrentData, dummyState, setFieldError } = useFileContext();
    const isLocalChange = useRef(false);

    const [value, setValue] = useState<T>(
        currentData.profile?.[field] !== undefined
            ? parse(currentData.profile?.[field])
            : defaultValue,
    );

    useEffect(() => {
        if (currentData.profile) {
            const newVal = parse(currentData.profile?.[field]);
            setValue(newVal ?? defaultValue);
        }
    }, [currentData.profile, field, dummyState]);

    useEffect(() => {
        if (!currentData.profile || !isLocalChange.current) return;

        let hasError: boolean | null = false;
        if (validate) {
            hasError = validate(value);
            setFieldError(field, hasError); // Повідомляємо контекст про помилку
        } else {
            setFieldError(field, null); // Очищаємо помилку, якщо валідації немає
        }

        if (!hasError) {
            setCurrentData({
                ...currentData,
                profile: {
                    ...currentData.profile,
                    [field]: format(value),
                },
            });
        }

        isLocalChange.current = false;
    }, [value, currentData, field, setCurrentData, validate, setFieldError]);

    const handleChange = (val: T) => {
        isLocalChange.current = true;
        setValue(val);
    };

    const reset = () => {
        if (currentData.profile) {
            setValue(
                currentData.profile?.[field] !== undefined
                    ? parse(currentData.profile?.[field])
                    : defaultValue,
            );
            setFieldError(field, false);
        }
    };

    return [value, handleChange, reset] as const;
}

// Extend TextInputProps and constrain 'field' to keys of ProfileProps
export interface FieldEditProps
    extends Omit<TextInputProps, "value" | "onChangeText"> {
    field: keyof ProfileProps;
}

export const FieldEdit = ({ field, ...props }: FieldEditProps) => {
    const [value, setValue] = useProfileFieldState<keyof ProfileProps, string>({
        field,
        defaultValue: "",
    });

    const [local, setLocal] = useState<string>("")

    useEffect(() => {
        setLocal(value)
    }, [value])

    const onBlur = () => {
        setValue(local)
    }

    return (
        <TextInput
            mode="outlined"
            dense
            value={local}
            onChangeText={setLocal}
            onBlur={onBlur}
            {...props}
        />
    );
};

export interface FieldEditFloatProps extends FieldEditProps, SpinBoxProps {
    field: keyof ProfileProps;
    multiplier?: number;
    fraction?: number;
}

export const FieldEditFloat = ({
    field,
    multiplier = 1,
    ...props
}: FieldEditFloatProps) => {
    const [err, setErr] = useState<Error | null>(null);

    const [value, setValue, reset] = useProfileFieldState<
        keyof ProfileProps,
        string
    >({
        field,
        defaultValue: "",
        parse: (v) => (v / multiplier).toString(),
        format: (v) => Math.round(parseFloat(v) * multiplier),
        validate: useCallback(() => {
            return !!err;
        }, [err]),
    });

    const [local, setLocal] = useState<number>(0)

    useEffect(() => {
        setLocal(parseFloat(value))
    }, [value])

    const handleSetValue = (value: number) => {
        // setValue(value.toString());
        setLocal(value)
    };

    const onBlur = () => {
        if (!err) {
            setValue(local.toString());
        } else {
            setLocal(parseFloat(value))
        }
    }

    return (
        <View style={props?.style as ViewStyle}>
            <LocalizedSpinBox
                // floatValue={parseFloat(value)}
                floatValue={local}
                onFloatValueChange={handleSetValue}
                onError={setErr}
                mode="outlined"
                keyboardType="decimal-pad"
                dense
                // onBlur={reset}
                onBlur={onBlur}
                {...props}
            />
            <HelperText type="error" visible={!!err}>
                {err?.message}
            </HelperText>
        </View>
    );
};

export type FieldProps = {
    [K in keyof ProfileProps]?: Partial<FieldEditProps>;
};

export type FieldFloatProps = {
    [K in keyof ProfileProps]?: Partial<FieldEditFloatProps>;
};
