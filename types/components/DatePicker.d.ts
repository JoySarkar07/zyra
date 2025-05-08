import React from "react";
interface FormField {
    label: string;
}
interface DatepickerProps {
    formField: FormField;
    onChange: (field: "label", value: string) => void;
}
declare const Datepicker: React.FC<DatepickerProps>;
export default Datepicker;
