import React from 'react';
export interface DisplayButtonProp {
    customStyle: {
        button_border_size?: number;
        button_border_color?: string;
        button_background_color?: string;
        button_text_color?: string;
        button_border_radious?: number;
        button_font_size?: number;
        button_font_width?: number;
        button_margin?: number;
        button_padding?: number;
        button_border_color_onhover?: string;
        button_text_color_onhover?: string;
        button_background_color_onhover?: string;
        button_text?: string;
    };
    children?: React.ReactNode;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
declare const DisplayButton: React.FC<DisplayButtonProp>;
export default DisplayButton;
