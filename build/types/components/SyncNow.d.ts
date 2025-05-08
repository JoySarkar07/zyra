import React from "react";
import '../styles/web/SyncNow.scss';
export interface SyncNowProps {
    buttonKey: string;
    interval: number;
    proSetting: boolean;
    proSettingChanged: () => boolean;
    value: string;
    description: string;
    apilink: string;
    statusApiLink: string;
    appLocalizer: Record<string, any>;
}
declare const SyncNow: React.FC<SyncNowProps>;
export default SyncNow;
