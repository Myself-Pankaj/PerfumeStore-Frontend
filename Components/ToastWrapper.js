import React, { forwardRef } from 'react';
import { StyleSheet } from 'react-native';
import { Toast } from 'react-native-toast-message/lib/src/Toast';


const ToastWrapper = forwardRef((props, ref) => (
  <Toast {...props} ref={ref} style={styles.toastWrapper} />
));

export default ToastWrapper;

const styles = StyleSheet.create({
  toastWrapper: {
    backgroundColor: 'blue',
    color: 'white',
    padding: 10,
    borderRadius: 5,
    position: 'absolute', // Use absolute positioning
    zIndex: 9999,
  },

});