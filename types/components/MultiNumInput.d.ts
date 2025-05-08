import React, { ChangeEvent } from "react";
export interface MultiNumOption {
    key: string;
    value: string | number;
    label: string;
    name?: string;
    type: string;
}
export interface MultiNumInputProps {
    parentWrapperClass?: string;
    childWrapperClass?: string;
    options: MultiNumOption[];
    value?: {
        key: string;
        value: string | number;
    }[];
    inputWrapperClass?: string;
    innerInputWrapperClass?: string;
    inputLabelClass?: string;
    inputClass?: string;
    idPrefix?: string;
    keyName?: string;
    proSetting?: boolean;
    description?: string;
    descClass?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>, keyName?: string, optionKey?: string, index?: number) => void;
}
declare const MultiNumInput: React.FC<MultiNumInputProps>;
export default MultiNumInput;
