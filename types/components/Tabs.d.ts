import { LinkProps } from "react-router-dom";
import { ReactNode } from "react";
import { SupportLink } from "./AdminFooter";
import '../styles/web/Tabs.scss';
type TabContent = {
    id: string;
    name: string;
    desc?: string;
    icon?: string;
    link?: string;
    proDependent?: boolean;
};
type TabData = {
    type: "file" | "folder";
    content: TabContent | TabData[];
};
type TabsProps = {
    tabData: TabData[];
    currentTab: string;
    getForm: (currentTab: string) => ReactNode;
    prepareUrl: (tabId: string) => string;
    HeaderSection?: () => JSX.Element;
    BannerSection?: () => JSX.Element;
    horizontally?: boolean;
    appLocalizer: any;
    brandImg: string;
    smallbrandImg: string;
    supprot: SupportLink[];
    Link: React.ElementType<LinkProps>;
};
declare const Tabs: React.FC<TabsProps>;
export default Tabs;
