import React from "react";
import "antd/dist/antd.min.css";
import { Table } from "antd";
import { ColumnsType } from "antd/lib/table";

interface GroupedTableProps {
    style?: React.CSSProperties;
    columns: ColumnsType<object>;
    data: any[];
    isLoading: boolean;
}

const GroupedTable = (props: GroupedTableProps) => {
    const { style, columns, data, isLoading } = props;
    return (
        <Table
            style={style}
            columns={columns}
            loading={isLoading}
            rowKey={(record: any) => record.id}
            dataSource={data}
        />
    );
};

export default GroupedTable;
