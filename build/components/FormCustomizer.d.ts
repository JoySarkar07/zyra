import React from 'react';
import '../styles/web/FormCustomizer.scss';
interface FormCustomizerProps {
    value?: string;
    buttonText?: string;
    setting: Record<string, any>;
    proSetting?: any;
    onChange: (key: string, value: any, isRestoreDefaults?: boolean) => void;
}
declare const FormCustomizer: React.FC<FormCustomizerProps>;
export default FormCustomizer;
