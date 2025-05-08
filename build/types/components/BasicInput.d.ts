import React, { ChangeEvent, MouseEvent, FocusEvent } from "react";
export interface BasicInputProps {
    wrapperClass?: string;
    inputLabel?: string;
    inputClass?: string;
    id?: string;
    type?: "text" | "button" | "number" | "color" | "password" | "email" | "file" | "range" | "url";
    name?: string;
    value?: string | number;
    placeholder?: string;
    min?: number;
    max?: number;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    onClick?: (e: MouseEvent<HTMLInputElement>) => void;
    onMouseOver?: (e: MouseEvent<HTMLInputElement>) => void;
    onMouseOut?: (e: MouseEvent<HTMLInputElement>) => void;
    onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
    parameter?: string;
    proSetting?: boolean;
    description?: string;
    descClass?: string;
    rangeUnit?: string;
    disabled?: boolean;
}
declare const BasicInput: React.FC<BasicInputProps>;
export default BasicInput;
