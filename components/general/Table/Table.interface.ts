export type Order = "asc" | "desc";


export interface Data {
    id: string,
    name: string,
    email: string,
    payments: Array<string>,
}

export interface HeadCell {
    disablePadding: boolean;
    id: keyof Data;
    label: string;
    numeric: boolean;
}

export interface EnhancedTableProps {
    onRequestSort: (
      event: React.MouseEvent<unknown>,
      property: keyof Data
    ) => void;
    order: Order;
    orderBy: string;
}