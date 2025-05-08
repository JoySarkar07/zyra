import React from "react";
import '../styles/web/SyncMap.scss';
export interface SyncMapProps {
    value?: [string, string][];
    onChange: (value: [string, string][]) => void;
    proSetting?: boolean;
    proSettingChanged: () => boolean;
    description?: string;
    syncFieldsMap: Record<string, {
        heading: string;
        fields: Record<string, string>;
    }>;
}
declare const SyncMap: React.FC<SyncMapProps>;
export default SyncMap;
