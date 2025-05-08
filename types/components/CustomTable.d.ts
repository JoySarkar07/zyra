import React, { ReactNode } from "react";
import { ColumnDef, OnChangeFn, RowSelectionState, PaginationState } from "@tanstack/react-table";
import '../styles/web/Table.scss';
export interface Subscriber {
    date: string;
    email: string;
    image: string;
    product: string;
    product_id: number;
    reg_user: string;
    status: string;
    status_key: string;
    user_link: string;
}
type SubscriberStatus = {
    key: string;
    name: string;
    count: number;
};
export interface TableCellProps {
    title: string;
    fieldValue?: string | boolean;
    children?: ReactNode;
    type?: string;
    header?: any;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export interface RealtimeFilter {
    name: string;
    render: (updateFilter: (key: string, value: any) => void, filterValue: any) => ReactNode;
}
export declare const TableCell: React.FC<TableCellProps>;
interface CustomTableProps {
    data: Record<string, any>[] | null;
    columns: ColumnDef<Record<string, any>, any>[];
    rowSelection?: Record<string, boolean>;
    onRowSelectionChange?: OnChangeFn<RowSelectionState>;
    defaultRowsPerPage?: number;
    realtimeFilter?: RealtimeFilter[];
    bulkActionComp?: () => React.ReactNode;
    pageCount: number;
    pagination: PaginationState;
    onPaginationChange: OnChangeFn<PaginationState>;
    typeCounts: SubscriberStatus[];
    autoLoading?: boolean;
    handlePagination?: (rowsPerPage: number, pageIndex: number, filterData: Record<string, any>) => void;
    perPageOption: number[];
    successMsg?: string;
}
declare const CustomTable: React.FC<CustomTableProps>;
export default CustomTable;
