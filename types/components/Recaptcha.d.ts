import React from "react";
interface RecaptchaProps {
    formField: {
        sitekey?: string;
    };
    onChange?: (field: string, value: any) => void;
}
declare const Recaptcha: React.FC<RecaptchaProps>;
export default Recaptcha;
