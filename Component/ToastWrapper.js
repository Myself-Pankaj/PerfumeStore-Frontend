import React, { forwardRef } from 'react';
import { Toast } from 'react-native-toast-message/lib/src/Toast';


const ToastWrapper = forwardRef((props, ref) => (
  <Toast {...props} ref={ref} />
));

export default ToastWrapper;
