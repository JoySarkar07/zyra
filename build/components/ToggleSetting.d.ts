import React from "react";
import '../styles/web/ToggleSetting.scss';
interface Option {
    key: string;
    value: string;
    label: string;
}
interface ToggleSettingProps {
    description?: string;
    options: Option[];
    wrapperClass?: string;
    descClass?: string;
    value: string;
    onChange: (value: string) => void;
    proSetting?: boolean;
}
declare const ToggleSetting: React.FC<ToggleSettingProps>;
export default ToggleSetting;
