import React from "react";
export interface Option {
    id: string;
    label: string;
    value: string;
    isdefault?: boolean;
}
export interface SelectOption {
    icon: string;
    value: string;
    label: string;
}
interface AddNewBtnProps {
    onAddNew?: () => void;
    large?: boolean;
}
interface DeleteBtnProps {
    onDelete?: () => void;
    hideDelete?: boolean;
}
export declare const DEFAULT_OPTIONS: Option[];
export declare const DEFAULT_PLACEHOLDER: (type: string) => string;
export declare const DEFAULT_LABEL_SIMPLE: (type: string) => string;
export declare const DEFAULT_LABEL_SELECT = "Nature of Business";
export declare const DEFAULT_FORM_TITLE = "Demo Form";
export declare const selectOptions: SelectOption[];
/**
 * Component that renders an action section for adding new items.
 */
export declare const AddNewBtn: React.FC<AddNewBtnProps>;
/**
 * Component that renders a delete button section.
 */
export declare const DeleteBtn: React.FC<DeleteBtnProps>;
interface FormField {
    id: number;
    type: string;
    label: string;
    required: boolean;
    name: string;
    placeholder?: string;
    options?: Option[];
    sitekey?: string;
}
interface ButtonSetting {
}
interface CustomFormProps {
    onChange: (data: {
        formfieldlist: FormField[];
        butttonsetting: ButtonSetting;
    }) => void;
    name: string;
    proSettingChange: () => boolean;
    formTitlePlaceholder?: string;
    setting: Record<string, any>;
}
declare const CustomFrom: React.FC<CustomFormProps>;
export default CustomFrom;
