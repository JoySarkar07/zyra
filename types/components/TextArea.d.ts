import React, { ChangeEvent, MouseEvent, FocusEvent } from "react";
export interface TextAreaProps {
    id?: string;
    key: string;
    name?: string;
    value?: string | number;
    maxLength?: number;
    placeholder?: string;
    wrapperClass?: string;
    inputClass?: string;
    rowNumber?: number;
    colNumber?: number;
    proSetting?: boolean;
    description?: string;
    descClass?: string;
    onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    onClick?: (e: MouseEvent<HTMLTextAreaElement>) => void;
    onMouseOver?: (e: MouseEvent<HTMLTextAreaElement>) => void;
    onMouseOut?: (e: MouseEvent<HTMLTextAreaElement>) => void;
    onFocus?: (e: FocusEvent<HTMLTextAreaElement>) => void;
}
export declare const TextArea: React.FC<TextAreaProps>;
export default TextArea;
