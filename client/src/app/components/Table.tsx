import { Table } from "antd";
import { AnyObject } from "antd/es/_util/type";
import type { ColumnGroupType, ColumnType } from "antd/es/table";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "../../../api";

const TableComponent = (props: {
  loading: boolean;
  data: readonly AnyObject[];
  columns: (ColumnGroupType<AnyObject> | ColumnType<AnyObject>)[];
  pageSize?: number;
}) => {
  const dispatch = useDispatch();
  const token = getToken({ useSelector });

  return (
    <Table
      loading={props.loading}
      pagination={{ pageSize: props.pageSize }}
      columns={props.columns}
      dataSource={props.data}
      className="border-bordercolor border-[1.5px] rounded-xl overflow-hidden"
    />
  );
};

export default TableComponent;
