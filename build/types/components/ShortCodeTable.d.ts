import React from 'react';
import '../styles/web/ShortCodeTable.scss';
interface Option {
    label: string;
    desc: string;
}
interface ShortCodeTableProps {
    wrapperClass: string;
    descClass: string;
    description?: string;
    options: Option[];
    optionLabel?: string[];
}
declare const ShortCodeTable: React.FC<ShortCodeTableProps>;
export default ShortCodeTable;
