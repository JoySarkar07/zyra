import React from 'react';
import '../styles/web/SubTabSection.scss';
export interface MenuItem {
    id: string;
    name: string;
    icon: string;
    link?: string;
}
interface SubTabSectionProps {
    menuitem: MenuItem[];
    currentTab: MenuItem;
    setCurrentTab: (tab: MenuItem) => void;
    setting?: any;
}
declare const SubTabSection: React.FC<SubTabSectionProps>;
export default SubTabSection;
