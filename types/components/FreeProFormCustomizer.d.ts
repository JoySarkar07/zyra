import React from 'react';
import '../styles/web/FreeProFormCustomizer.scss';
import '../styles/web/RegistrationForm.scss';
interface FormField {
    key: string;
    label?: string;
    active?: boolean;
    desc?: string;
}
interface FreeProFormCustomizerProps {
    setting: {
        freefromsetting?: FormField[];
    };
    proSetting: any;
    proSettingChange: () => boolean;
    moduleEnabledChange: () => boolean;
    onChange: (key: string, value: any) => void;
}
declare const FreeProFormCustomizer: React.FC<FreeProFormCustomizerProps>;
export default FreeProFormCustomizer;
