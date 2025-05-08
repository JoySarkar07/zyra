import React from "react";
interface FormField {
    label: string;
    placeholder?: string;
}
interface AttachmentProps {
    formField: FormField;
    onChange: (field: string, value: string) => void;
}
declare const Attachment: React.FC<AttachmentProps>;
export default Attachment;
