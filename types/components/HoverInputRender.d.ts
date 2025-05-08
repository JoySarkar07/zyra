import React, { JSX } from "react";
interface HoverInputRenderProps {
    label: string;
    placeholder?: string;
    onLabelChange: (newLabel: string) => void;
    renderStaticContent: (props: {
        label: string;
        placeholder?: string;
    }) => JSX.Element;
    renderEditableContent: (props: {
        label: string;
        onLabelChange: (newLabel: string) => void;
        placeholder?: string;
    }) => JSX.Element;
}
declare const HoverInputRender: React.FC<HoverInputRenderProps>;
export default HoverInputRender;
