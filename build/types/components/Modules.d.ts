import React from "react";
import '../styles/web/Modules.scss';
interface Module {
    id: string;
    name: string;
    desc: string;
    icon: string;
    doc_link: string;
    settings_link: string;
    pro_module?: boolean;
}
interface ModuleProps {
    insertModule?: (moduleId: string) => void;
    removeModule?: (moduleId: string) => void;
    modulesArray?: Module[];
    appLocalizer: Record<string, any>;
}
declare const Modules: React.FC<ModuleProps>;
export default Modules;
