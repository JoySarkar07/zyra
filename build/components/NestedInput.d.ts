import React from "react";
import { SelectOptions } from "./SelectInput";
interface ParentOption {
    label: string;
    key: string;
    type: "text" | "number" | "checkbox" | "select" | "select2nd" | "country";
    options: SelectOptions[];
}
interface Option {
    [key: string]: any;
}
interface NestedInputProps {
    wrapperClass?: string;
    ParentWrapperClass?: string;
    innerParentWrapperClass?: string;
    parentLabelClass?: string;
    parentInputClass?: string;
    value: Option[];
    parentOptions: ParentOption[];
    parentOnchage: (e: React.ChangeEvent<HTMLInputElement>, option?: any) => void;
}
declare const NestedInput: React.FC<NestedInputProps>;
export default NestedInput;
