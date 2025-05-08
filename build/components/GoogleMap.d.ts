import React from "react";
interface GoogleMapProps {
    center: {
        lat: number;
        lng: number;
    };
    wrapperClass?: string;
    placeholder?: string;
}
declare const GoogleMap: React.FC<GoogleMapProps>;
export default GoogleMap;
