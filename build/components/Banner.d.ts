import React from 'react';
import '../styles/web/Banner.scss';
interface Products {
    title: string;
    description: string;
}
interface BannerProps {
    is_pro?: boolean;
    products?: Products[];
    pro_url: string;
}
declare const Banner: React.FC<BannerProps>;
export default Banner;
