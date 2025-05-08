import '../styles/web/AdminFooter.scss';
export interface SupportLink {
    title: string;
    icon: string;
    description: string;
    link: string;
}
type FooterProps = {
    supportLink: SupportLink[];
};
declare const AdminFooter: React.FC<FooterProps>;
export default AdminFooter;
