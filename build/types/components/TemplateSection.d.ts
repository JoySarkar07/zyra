import { FC } from "react";
interface FormField {
    label: string;
}
interface TemplateSectionProps {
    formField: FormField;
    onChange: (key: string, value: string) => void;
}
declare const TemplateSection: FC<TemplateSectionProps>;
export default TemplateSection;
