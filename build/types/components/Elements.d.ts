import React from "react";
interface Option {
    value: string;
    label: string;
    icon?: string;
}
interface ElementsProps {
    selectOptions: Option[];
    onClick: (value: string) => void;
}
declare const Elements: React.FC<ElementsProps>;
export default Elements;
