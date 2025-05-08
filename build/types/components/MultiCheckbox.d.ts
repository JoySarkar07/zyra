import React, { ChangeEvent, MouseEvent } from "react";
export interface Option {
    key: string;
    value: string;
    label: string;
    name?: string;
    proSetting?: boolean;
    hints?: string;
}
export interface MultiCheckBoxProps {
    wrapperClass?: string;
    selectDeselect?: boolean;
    selectDeselectClass?: string;
    selectDeselectValue?: string;
    onMultiSelectDeselectChange?: (e: MouseEvent<HTMLButtonElement>) => void;
    options: Option[];
    value?: string[];
    inputWrapperClass?: string;
    rightContent?: boolean;
    rightContentClass?: string;
    inputInnerWrapperClass?: string;
    tour?: string;
    inputClass?: string;
    idPrefix?: string;
    type?: "checkbox" | "radio";
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    proChanged?: () => void;
    proSetting?: boolean;
    hintOuterClass?: string;
    description?: string;
    descClass?: string;
    hintInnerClass?: string;
}
declare const MultiCheckBox: React.FC<MultiCheckBoxProps>;
export default MultiCheckBox;
