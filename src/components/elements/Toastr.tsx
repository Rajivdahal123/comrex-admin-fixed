import React from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from "prop-types";
import {
    FaInfo,
    FaCheck,
    FaExclamationTriangle,
    FaBug,
    FaExclamationCircle
} from "react-icons/fa";
import {toast, TypeOptions} from "react-toastify";

export const displayIcon = (type: string) => {
    switch (type) {
        case "success":
            return <FaCheck />;
        case "info":
            return <FaInfo />;
        case "error":
            return <FaExclamationCircle />;
        case "warning":
            return <FaExclamationTriangle />;
        default:
            return <FaBug />;
    }
};

const toastWithType = (type: TypeOptions) => {
    switch (type) {
        case "success":
            return toast.success;
        case "info":
            return toast.info;
        case "error":
            return toast.error;
        case "warning":
            return toast.warning;
        default:
            return toast.success;
    }
};

const ToastMessage = ({type, message}: {type: TypeOptions, message: any}) =>
    toastWithType(type)(
        <div style={{ display: "flex", color: "white" }}>
            <div
                style={{
                    fontSize: 15,
                    paddingTop: 8,
                    flexShrink: 0,
                    textAlign: "center",
                    width: "30px"
                }}
            >
                {displayIcon(type)}
            </div>
            <div style={{ flexGrow: 1, fontSize: 15, padding: "8px 12px" }}>
                {message}
            </div>
        </div>
    );

ToastMessage.propTypes = {
    message: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
};

ToastMessage.dismiss = toast.dismiss;

export default ToastMessage;
