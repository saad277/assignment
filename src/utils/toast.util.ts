import { toast, ToastOptions } from "react-toastify";

type ToasterType = "success" | "error" | "warning";

type ToasterArgs = {
    type?: ToasterType;
    message?: string;
};

export const toaster: React.FC<ToasterArgs> = (props) => {
    const { type = "success", message = "" } = props;
    const options: ToastOptions = {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
    };
    toast[type](message, options);
    return null;
};
