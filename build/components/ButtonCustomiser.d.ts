import React from "react";
import '../styles/web/ButtonCustomizer.scss';
interface ButtonCustomizerProps {
    onChange: (key: string, value: any, isRestoreDefaults?: boolean) => void;
    setting?: Record<string, any>;
    className?: string;
    text: string;
    proSetting?: any;
}
declare const ButtonCustomizer: React.FC<ButtonCustomizerProps>;
export default ButtonCustomizer;
