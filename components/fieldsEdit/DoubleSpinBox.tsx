import { forwardRef, useEffect, useState } from "react";
import { NativeSyntheticEvent, TextInputKeyPressEventData } from "react-native";
import { TextInput, TextInputProps } from "react-native-paper";

export type SpinBoxRange = {
    min?: number;
    max?: number;
};

export type SpinBoxRangeErrorType = 'lessThanMin' | 'greaterThanMax';

export class SpinBoxRangeError extends Error {
    public range?: SpinBoxRange;
    public actualValue: number;
    public type?: SpinBoxRangeErrorType;

    constructor(message: string, actualValue: number, range?: SpinBoxRange, type?: SpinBoxRangeErrorType) {
        super(message);
        this.name = "SpinBoxRangeError";
        this.range = range;
        this.actualValue = actualValue;
        this.type = type;
        // Maintain proper stack trace in Node.js
        Object.setPrototypeOf(this, SpinBoxRangeError.prototype);
    }
}


function validateRange(value: number, range?: SpinBoxRange): SpinBoxRangeError | null {
    if (range?.min !== undefined && value < range.min) {
        return new SpinBoxRangeError(`Value must be at least ${range.min}`, value, range, 'lessThanMin');
    }
    if (range?.max !== undefined && value > range.max) {
        return new SpinBoxRangeError(`Value must be at most ${range.max}`, value, range, 'greaterThanMax');
    }
    return null;
}

export interface SpinBoxProps extends TextInputProps {
    floatValue?: number;
    onFloatValueChange?: (newValue: number) => void;
    fraction?: number; // Number of decimal places
    range?: SpinBoxRange;
    step?: number; // Step increment/decrement value
    strict?: boolean;
    onError?: (error: Error | null) => void;
    debounceDelay?: number;
}

export const DoubleSpinBox: React.FC<SpinBoxProps> = forwardRef(
    (
        {
            floatValue = 0,
            onFloatValueChange = undefined,
            fraction = 2, // Default to 2 decimal places
            range = undefined,
            step = 1,
            strict = false,
            onError = undefined,
            ...props
        },
        ref,
    ) => {
        const [currentValue, setCurrentValue] = useState<string>(
            floatValue.toFixed(fraction),
        );
        const [error, setError] = useState<Error | null>(null);

        useEffect(() => {
            const error = validateRange(floatValue, range);
            onErrorSet(error);
            setCurrentValue(floatValue.toFixed(fraction));
        }, [floatValue]);

        const onErrorSet = (error: Error | null) => {
            setError(error);
            onError?.(error);
        };

        const valueChanged = (value: number) => onFloatValueChange?.(value);

        // Handle digit input from keyboard
        const handleInputChange = (text: string) => {
            const sanitizedText = text.replace(/(?!^-)[^0-9]/g, "");

            if (sanitizedText === "") {
                setCurrentValue("0".padEnd(fraction + 1, "0"));
                // debouncedValueChange(0);
                valueChanged(0);
                return;
            }

            const isNegative = sanitizedText.startsWith("-");
            const parsedValue = parseInt(sanitizedText, 10);
            const newValue = (parsedValue / Math.pow(10, fraction)).toFixed(
                fraction,
            );
            const numericValue = parseFloat(newValue);

            const error = validateRange(numericValue, range);
            onErrorSet(error);

            setCurrentValue(
                isNegative && numericValue === 0 ? "-" + newValue : newValue,
            );

            if (strict && error) {
                return;
            }
            // debouncedValueChange(numericValue);
            valueChanged(numericValue);
        };

        // Add input at the end of the text or handle backspace
        const processKeyPress = (
            e: NativeSyntheticEvent<TextInputKeyPressEventData>,
        ) => {
            const key = e.nativeEvent.key;

            if (key === "-" || key === "+") {
                handleInputChange(
                    !currentValue.includes("-")
                        ? "-" + currentValue
                        : currentValue.slice(1),
                );
            } else {
                const numValue = parseFloat(currentValue);
                if (key === "ArrowUp") {
                    handleInputChange((numValue + step).toFixed(fraction));
                } else if (key === "ArrowDown") {
                    handleInputChange((numValue - step).toFixed(fraction));
                }
            }
        };

        return (
            <>
                <TextInput
                    ref={ref}
                    {...props}
                    keyboardType="numbers-and-punctuation" // NOTE: ios only
                    returnKeyType="done" // Customize return key type
                    error={!!error}
                    value={currentValue}
                    onKeyPress={processKeyPress}
                    onChange={(e) => handleInputChange(e.nativeEvent.text)}
                />
            </>
        );
    },
);
