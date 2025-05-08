import React from "react";
export interface CalendarInputProps {
    wrapperClass?: string;
    inputClass?: string;
    format?: string;
    multiple?: boolean;
    range?: boolean;
    value: string;
    onChange?: (date: any) => void;
    proSetting?: boolean;
}
declare const CalendarInput: React.FC<CalendarInputProps>;
export default CalendarInput;
