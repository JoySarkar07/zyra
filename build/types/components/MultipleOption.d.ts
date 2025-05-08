import React from "react";
interface Option {
    id: string;
    label: string;
    value: string;
    isdefault?: boolean;
}
interface FormField {
    id: number;
    type: string;
    label: string;
    required: boolean;
    name: string;
    placeholder?: string;
    options?: Option[];
}
interface MultipleOptionsProps {
    formField: FormField;
    onChange: (key: string, value: any) => void;
    type: "radio" | "checkboxes" | "dropdown" | "multiselect";
    selected: boolean;
}
declare const MultipleOptions: React.FC<MultipleOptionsProps>;
export default MultipleOptions;
