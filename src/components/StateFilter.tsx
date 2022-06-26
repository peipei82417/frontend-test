import React from "react";
import "antd/dist/antd.min.css";
import { Select } from "antd";
import { useDispatch } from "react-redux";
import { combiInfoActions } from "../store/combiInfo";

interface StateFilterProps {
    options: string[];
    defaultValue?: string[];
}

const StateFilter = (props: StateFilterProps) => {
    const { Option } = Select;
    const { options, defaultValue } = props;
    const dispatch = useDispatch();

    const handleChange = (value: string | string[] | undefined) => {
        dispatch(combiInfoActions.changeFilteredInfo({ value: value }));
    };

    return (
        <Select
            mode="multiple"
            allowClear
            style={{
                width: "100%",
            }}
            defaultValue={defaultValue}
            placeholder="Please select"
            onChange={handleChange}
        >
            {options.map((option) => (
                <Option key={option}>{option}</Option>
            ))}
        </Select>
    );
};
export default StateFilter;
