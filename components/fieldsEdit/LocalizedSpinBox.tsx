import { forwardRef } from "react"
import { DoubleSpinBox, SpinBoxProps, SpinBoxRangeError } from "./DoubleSpinBox"
import { useTranslation } from "react-i18next";


export const LocalizedSpinBox: React.FC<SpinBoxProps> = forwardRef(
    (
        {
            onError = undefined,
            ...props
        },
        ref,
    ) => {
        const { t } = useTranslation()

        const handleSetError = (err: Error | null) => {
            if (!err) {
                onError?.(null);
                return;
            }

            if (err instanceof SpinBoxRangeError) {
                switch (err.type) {
                    case "greaterThanMax":
                        onError?.(new Error(t("doubleSpinBoxError.greaterThanMax", { max: err.range?.max })));
                        break;
                    case "lessThanMin":
                        onError?.(new Error(t("doubleSpinBoxError.lessThanMin", { min: err.range?.min })));
                        break;
                    default:
                        onError?.(err);
                }
                return;
            } else {
                onError?.(err);
            }
        };

        return <DoubleSpinBox
            ref={ref}
            onError={handleSetError}
            {...props}
        />
    }
);