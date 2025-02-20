import {toast} from "react-toastify";

export const notifySuccess = async (msg: string) => toast.success(msg);
export const notifyWarning = async (msg: string) => toast.warn(msg);
export const notifyInfo = async (msg: string) => toast.info(msg);
export const notifyError = async (msg: string) => toast.error(msg);

export const choseNotify = async (msg: string[], status: number) => {
    if(status >= 100 && status <= 199)
        msg.forEach(async (m) => await notifyInfo(m));
    
    else if (status >= 200 && status <= 299)
        msg.forEach(async (m) => await notifySuccess(m));
    
    else if (status >= 400 && status <= 499)
        msg.forEach(async (m) => await notifyWarning(m));
    
    else if (status >= 500 && status <= 599)
        msg.forEach(async (m) => await notifyError(m));
}
