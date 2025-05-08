import React, { ChangeEvent } from "react";
export interface RadioOption {
    key: string;
    keyName?: string;
    value: string;
    label: string;
    name: string;
    color?: string[] | string;
}
export interface RadioInputProps {
    name?: string;
    wrapperClass?: string;
    inputWrapperClass?: string;
    activeClass?: string;
    inputClass?: string;
    idPrefix?: string;
    type?: "radio-select" | "radio-color" | "default";
    options: RadioOption[];
    value?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    radiSelectLabelClass?: string;
    labelImgClass?: string;
    labelOverlayClass?: string;
    labelOverlayText?: string;
    proSetting?: boolean;
    description?: string;
    descClass?: string;
    keyName?: string;
}
declare const RadioInput: React.FC<RadioInputProps>;
export default RadioInput;
