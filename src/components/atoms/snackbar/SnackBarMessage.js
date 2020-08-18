import React from 'react';
import SnackBar from 'rn-snackbar-component';

export default SnackBarMessage = ({ children, snackVisibility }) => {
  return(
    <SnackBar
      visible={snackVisibility}
      message={(
        children
      )}
      actionHandler={() => {
        console.log("snackbar button clicked!")
      }}
      autoHidingTime={0}
    />
  )
}