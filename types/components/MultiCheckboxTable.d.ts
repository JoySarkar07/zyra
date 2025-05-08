import React from "react";
import '../styles/web/MultiCheckboxTable.scss';
interface Column {
    key: string;
    label: string;
    moduleEnabled?: string;
}
interface Row {
    key: string;
    label: string;
    options?: {
        value: string | number;
        label: string;
    }[];
}
interface MultiCheckboxTableProps {
    rows: Row[];
    columns: Column[];
    description?: string;
    onChange: (key: string, value: any) => void;
    setting: Record<string, any>;
    proSetting?: boolean;
    modules: string[];
    moduleChange: (module: string) => void;
}
declare const MultiCheckboxTable: React.FC<MultiCheckboxTableProps>;
export default MultiCheckboxTable;
