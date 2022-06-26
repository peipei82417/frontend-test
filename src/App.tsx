import "./App.css";
import "antd/dist/antd.min.css";
import { Layout, message } from "antd";
import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import { getPropertyDataByFilter } from "./lib/fetch-api";
import ProjectVariable from "./constant/ProjectVariable";
import StateFilter from "./components/StateFilter";
import GroupedTable from "./components/GroupedTable";
import CheckboxGroup from "./components/CheckboxGroup";
import RegroupBtn from "./components/RegroupBtn";

const App = () => {
    const { Content, Sider } = Layout;

    const [isLoading, setIsLoading] = useState(true);
    const [groupedData, setGroupedData] = useState<any[]>([]);
    const [tableColumns, setTableColumns] = useState([]);

    const filteredInfo = useSelector<RootState, string | string[] | undefined>(
        (state) => state.combiInfo.filteredInfo
    );
    const groupedInfo = useSelector<RootState, string | string[] | undefined>(
        (state) => state.combiInfo.groupedInfo
    );

    const filteredInfoRef = useRef(filteredInfo);
    const groupedInfoRef = useRef(groupedInfo);

    const setPropertyDataByFiltererAndGroup = (
        filteredInfo: any,
        fields: any
    ) => {
        setIsLoading(true);
        getPropertyDataByFilter(filteredInfo).then((res) => {
            if (res) {
                const cols: any = ProjectVariable.getTableColsByFields(fields);
                const groups = ProjectVariable.groupByFields(res, fields);
                const rowData = ProjectVariable.getTableRowByCols(groups, cols);
                setTableColumns(cols);
                setGroupedData(rowData);
            }
            setIsLoading(false);
        });
    };

    useEffect(() => {
        const filteredInfo = filteredInfoRef.current;
        const groupedInfo = groupedInfoRef.current;
        setPropertyDataByFiltererAndGroup(filteredInfo, groupedInfo);
    }, []);

    const handleRegroup = () => {
        if (groupedInfo?.length === 0) {
            message.warning("請至少輸入一個選項");
            return;
        }
        setPropertyDataByFiltererAndGroup(filteredInfo, groupedInfo);
    };

    return (
        <Layout
            style={{
                minHeight: "100vh",
            }}
        >
            <Sider className="site-layout-background" width={250}>
                <h3>Filter State: </h3>
                <StateFilter
                    options={ProjectVariable.stateFilterOptions}
                    defaultValue={ProjectVariable.stateFilterDefaultValue}
                />
                <h3>Group by: </h3>
                <CheckboxGroup
                    options={ProjectVariable.groupCheckboxOptions}
                    defaultValue={ProjectVariable.groupCheckboxDefaultValue}
                />
                <RegroupBtn isLoading={isLoading} handleClick={handleRegroup} />
            </Sider>
            <Content>
                <div className="site-layout-content">
                    <GroupedTable
                        columns={tableColumns}
                        data={groupedData}
                        isLoading={isLoading}
                    />
                </div>
            </Content>
        </Layout>
    );
};

export default App;
