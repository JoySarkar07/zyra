import '../styles/web/Support.scss';
type FAQ = {
    question: string;
    answer: string;
    open: boolean;
};
type SupprotProps = {
    url: string;
    title?: string;
    subTitle?: string;
    faqData: FAQ[];
};
declare const Support: React.FC<SupprotProps>;
export default Support;
