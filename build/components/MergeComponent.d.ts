import React from "react";
import '../styles/web/MergeComponent.scss';
interface Field {
    name: string;
    type: "select" | "number" | "text";
    options?: {
        value: string;
        label: string;
    }[];
    placeholder?: string;
}
interface MergeComponentProps {
    wrapperClass?: string;
    descClass?: string;
    description?: string;
    onChange: (data: Record<string, string | number>) => void;
    value: Record<string, string | number>;
    proSetting?: boolean;
    fields: Field[];
}
declare const MergeComponent: React.FC<MergeComponentProps>;
export default MergeComponent;
