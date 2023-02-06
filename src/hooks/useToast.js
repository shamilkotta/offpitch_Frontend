import { toast } from "react-toastify";

export const useSuccessToast = ({ message }) => {
  toast.success(message, {
    theme: "colored",
    position: toast.POSITION.TOP_RIGHT,
  });
};

export const useWarningToast = ({ message }) => {
  toast.warn(message, {
    theme: "colored",
    position: toast.POSITION.TOP_RIGHT,
  });
};

export const useErrorToast = ({ message }) => {
  toast.error(message, {
    theme: "colored",
    position: toast.POSITION.TOP_RIGHT,
  });
};

export const useInfoToast = ({ message }) => {
  toast.info(message, {
    theme: "colored",
    position: toast.POSITION.TOP_RIGHT,
  });
};
