import { throttle } from "lodash";
import { ToastContainer, toast, ToastOptions } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

let message: string;
let messageType: keyof typeof toast;
const toastrOptions: ToastOptions = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

// Fire the toast notification
export default function fire(_messageType: keyof typeof toast, _message: string) {
  message = _message;
  messageType = _messageType;
  throttledFunction();
}

// Throttle the message display
const throttledFunction = throttle(() => showMessage(), 1000);

// Function to display the toast notification
function showMessage() {
  const backgroundColor = getBackgroundColor(messageType);
  const textColor = { color: '#fff' }; 

  // Show the toast based on the message type
  switch (messageType) {
    case 'success':
      toast.success(message, { ...toastrOptions, style: { backgroundColor, ...textColor } });
      break;
    case 'error':
      toast.error(message, { ...toastrOptions, style: { backgroundColor, ...textColor } });
      break;
    case 'info':
      toast.info(message, { ...toastrOptions, style: { backgroundColor, ...textColor } });
      break;
    case 'warning':
      toast.warning(message, { ...toastrOptions, style: { backgroundColor, ...textColor } });
      break;
    default:
      toast(message, { ...toastrOptions, style: { backgroundColor, ...textColor } });
  }
}

// Function to determine background color based on message type
function getBackgroundColor(type: keyof typeof toast): string {
  switch (type) {
    case "info":
      return "#a461d8";
    case "warning":
      return "#ffc542";
    case "error":
      return "#fc5a5a";
    case "success":
      return "#83B739";
    default:
      return "#fff"; // default color
  }
}

// In your app, render the ToastContainer once
export function ToastContainerComponent() {
  return <ToastContainer />;
}
