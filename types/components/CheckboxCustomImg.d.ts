import React from "react";
import '../styles/web/CheckboxCustomImg.scss';
interface SyncDirection {
    value: string;
    img1: string;
    img2: string;
    label: string;
}
interface CheckboxCustomImgProps {
    value?: string[];
    onChange: (updatedValue: string[]) => void;
    syncDirections: SyncDirection[];
    description?: string;
    proSetting?: boolean;
}
declare const CheckboxCustomImg: React.FC<CheckboxCustomImgProps>;
export default CheckboxCustomImg;
