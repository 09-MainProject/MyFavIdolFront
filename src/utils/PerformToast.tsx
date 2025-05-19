import {toast} from 'react-toastify';

interface PerformToastProps {
    msg: string;
    type: 'error' | 'success' | 'warning';
}


function PerformToast({msg, type}: PerformToastProps) {
    
    switch (type) {
        case 'error':
            return toast.error(msg);
        case 'success':
            return toast.success(msg);
        case 'warning':
            return toast.warn(msg);
        default:
            break;
    }
}

export default PerformToast;