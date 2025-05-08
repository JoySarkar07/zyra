import React from 'react';
import '../styles/web/FromViewer.scss';
declare global {
    interface Window {
        grecaptcha?: {
            ready: (callback: () => void) => void;
            execute: (siteKey: string, options: {
                action: string;
            }) => Promise<string>;
        };
    }
}
interface Option {
    value: string;
    label: string;
    isdefault?: boolean;
}
interface Field {
    type: string;
    name?: string;
    label?: string;
    placeholder?: string;
    required?: boolean;
    charlimit?: number;
    row?: number;
    col?: number;
    disabled?: boolean;
    options?: Option[];
    sitekey?: string;
    key?: string;
}
interface FormFields {
    formfieldlist: Field[];
    butttonsetting?: any;
}
export interface FromViewerProps {
    formFields: FormFields;
    onSubmit: (data: FormData) => void;
}
declare const FromViewer: React.FC<FromViewerProps>;
export default FromViewer;
