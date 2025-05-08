import React from "react";
interface DefaultMetaProps {
    defaultvalue: string;
    name: string;
    deactive: boolean;
    onChange: (field: "deactive" | "name" | "defaultvalue", value: boolean | string) => void;
    hideDefaultValue?: boolean;
    hideName?: boolean;
    hideDeactive?: boolean;
}
declare const DefaultMeta: React.FC<DefaultMetaProps>;
export default DefaultMeta;
