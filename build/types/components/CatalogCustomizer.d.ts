import React from 'react';
import '../styles/web/CatalogCustomizer.scss';
export interface CatalogCustomizerProps {
    onChange: (key: string, value: any) => void;
    proSetting?: boolean;
    setting: Record<string, any>;
    Sample_Product: string;
    pro_url: string;
}
declare const CatalogCustomizer: React.FC<CatalogCustomizerProps>;
export default CatalogCustomizer;
