import React from "react";
import { MultiValue, SingleValue, ActionMeta } from "react-select";
export interface SelectOptions {
    value: string;
    label: string;
    index?: number;
}
export interface SelectInputProps {
    wrapperClass?: string;
    selectDeselect?: boolean;
    selectDeselectClass?: string;
    selectDeselectValue?: string;
    name?: string;
    onMultiSelectDeselectChange?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    options: SelectOptions[];
    value?: string | string[];
    inputClass?: string;
    type?: "single-select" | "multi-select";
    onChange?: (newValue: SingleValue<SelectOptions> | MultiValue<SelectOptions>, actionMeta: ActionMeta<SelectOptions>) => void;
    onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
    proSetting?: boolean;
    description?: string;
    descClass?: string;
}
declare const SelectInput: React.FC<SelectInputProps>;
export default SelectInput;
