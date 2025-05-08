import React from "react";
interface TimepickerProps {
    formField: {
        label: string;
    };
    onChange: (field: string, value: string) => void;
}
declare const Timepicker: React.FC<TimepickerProps>;
export default Timepicker;
