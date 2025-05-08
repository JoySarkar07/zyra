import React from "react";
interface FormField {
    type: string;
    name: string;
    placeholder?: string;
    charlimit?: number;
    row?: number;
    column?: number;
    sitekey?: string;
    filesize?: number;
    required?: boolean;
    disabled?: boolean;
}
interface InputType {
    value: string;
    label: string;
}
interface SettingMetaBoxProps {
    formField: FormField;
    inputTypeList: InputType[];
    onChange: (field: keyof FormField, value: any) => void;
    onTypeChange: (value: string) => void;
    opened: {
        click: boolean;
    };
}
declare const SettingMetaBox: React.FC<SettingMetaBoxProps>;
export default SettingMetaBox;
