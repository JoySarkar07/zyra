import React from "react";
import '../styles/web/popupContent.scss';
export interface ProPopupProps {
    proUrl?: string;
    title?: string;
    messages?: string[];
}
declare const ProPopup: React.FC<ProPopupProps>;
export default ProPopup;
