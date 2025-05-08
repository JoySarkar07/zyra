import React from "react";
interface Option {
    label: string;
    value: string;
    isdefault?: boolean;
}
interface OptionMetaBoxProps {
    option: Option;
    onChange: (key: keyof Option, value: string) => void;
    setDefaultValue: () => void;
    hasOpen: boolean;
}
declare const OptionMetaBox: React.FC<OptionMetaBoxProps>;
export default OptionMetaBox;
