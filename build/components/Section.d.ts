import React from "react";
export interface SectionProps {
    wrapperClass: string;
    hint?: string;
    value?: string;
}
declare const Section: React.FC<SectionProps>;
export default Section;
