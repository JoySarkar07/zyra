import React from "react";
import '../styles/web/popupContent.scss';
export interface ModulePopupProps {
    moduleName?: string;
    settings?: string;
    plugin?: string;
    moduleMessage?: string;
    moduleButton?: string;
    pluginDescription?: string;
    pluginMessage?: string;
    pluginButton?: string;
    SettingDescription?: string;
    SettingMessage?: string;
    pluginUrl?: string;
    modulePageUrl?: string;
}
declare const ModulePopup: React.FC<ModulePopupProps>;
export default ModulePopup;
