import React from "react";
import '../styles/web/InputMailchimpList.scss';
interface InputMailchimpListProps {
    mailchimpKey: string;
    optionKey: string;
    settingChanged: React.MutableRefObject<boolean>;
    apiLink: string;
    proSettingChanged: () => boolean;
    onChange: (event: {
        target: {
            value: string;
        };
    }, key: string) => void;
    selectKey: string;
    value?: string;
    setting: Record<string, any>;
    updateSetting: any;
    appLocalizer: Record<string, any>;
}
declare const InputMailchimpList: React.FC<InputMailchimpListProps>;
export default InputMailchimpList;
