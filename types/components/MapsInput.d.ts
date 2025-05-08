import React from "react";
interface MapsInputProps {
    wrapperClass?: string;
    containerId?: string;
    containerClass?: string;
    Lat?: number;
    Lng?: number;
    proSetting: boolean;
    descClass?: string;
    description?: string;
}
declare const MapsInput: React.FC<MapsInputProps>;
export default MapsInput;
