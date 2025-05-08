import React, { MouseEvent } from "react";
export interface ButtonProps {
    wrapperClass?: string;
    inputClass?: string;
    type?: "button" | "submit" | "reset";
    value?: string;
    onClick?: (e: MouseEvent<HTMLInputElement>) => void;
    proSetting?: boolean;
    description?: string;
    descClass?: string;
}
declare const Button: React.FC<ButtonProps>;
export default Button;
