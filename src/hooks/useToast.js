import { toast } from "react-toastify";

export const useSuccessToast = ({ message }) => {
  toast.success(message, {
    position: toast.POSITION.TOP_RIGHT,
  });
};

export const useWarningToast = ({ message }) => {
  toast.warn(message, {
    position: toast.POSITION.TOP_RIGHT,
  });
};

export const useErrorToast = ({ message }) => {
  toast.error(message, {
    position: toast.POSITION.TOP_RIGHT,
  });
};

export const useInfoToast = ({ message }) => {
  toast.info(message, {
    position: toast.POSITION.TOP_RIGHT,
  });
};
