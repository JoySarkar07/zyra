import React from "react";
export interface LabelProps {
    wrapperClass: string;
    descClass: string;
    description?: string;
    value: string;
}
declare const Label: React.FC<LabelProps>;
export default Label;
