import React from "react";
import "antd/dist/antd.min.css";
import { Button } from "antd";

interface ReqroupBtnProps {
    isLoading: boolean;
    handleClick: () => void;
}

const RegroupBtn = (props: ReqroupBtnProps) => {
    const { isLoading, handleClick } = props;

    return (
        <Button type="primary" loading={isLoading} onClick={handleClick}>
            reGroup !
        </Button>
    );
};

export default RegroupBtn;
