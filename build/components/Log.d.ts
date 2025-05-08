import React from "react";
import '../styles/web/Log.scss';
export interface LogProps {
    fetchApiLink: string;
    downloadApiLink: string;
    downloadFileName: string;
    appLocalizer: Record<string, any>;
}
declare const Log: React.FC<LogProps>;
export default Log;
