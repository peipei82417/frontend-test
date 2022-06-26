import React from "react";
import "antd/dist/antd.min.css";
import { Checkbox } from "antd";
import { CheckboxValueType } from "antd/lib/checkbox/Group";
import { useDispatch } from "react-redux";
import { combiInfoActions } from "../store/combiInfo";

interface CheckboxGroupProps {
    options: string[];
    defaultValue?: string[];
}

const CheckboxGroup = (props: CheckboxGroupProps) => {
    const { options, defaultValue } = props;
    const dispatch = useDispatch();

    const handleChange = (checkedValues: CheckboxValueType[]) => {
        dispatch(combiInfoActions.changeGroupedInfo({ values: checkedValues }));
    };

    return (
        <Checkbox.Group
            style={{
                display: "flex",
                flexDirection: "column",
            }}
            defaultValue={defaultValue}
            options={options}
            onChange={handleChange}
        />
    );
};

export default CheckboxGroup;
