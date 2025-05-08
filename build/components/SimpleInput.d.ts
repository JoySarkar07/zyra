import React from "react";
interface SimpleInputProps {
    formField: {
        label: string;
        placeholder?: string;
    };
    onChange: (field: string, value: string) => void;
}
declare const SimpleInput: React.FC<SimpleInputProps>;
export default SimpleInput;
