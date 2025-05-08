import React from "react";
interface TextareaProps {
    formField: {
        label: string;
        placeholder?: string;
    };
    onChange: (field: string, value: string) => void;
}
declare const TemplateTextarea: React.FC<TextareaProps>;
export default TemplateTextarea;
