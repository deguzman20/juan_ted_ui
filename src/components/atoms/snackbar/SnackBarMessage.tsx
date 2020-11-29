import React, { FC } from 'react';
import SnackBar from 'rn-snackbar-component';

interface Props {
  children: any;
  snackVisibility: boolean;
};

const SnackBarMessage: FC<Props> = ({ children, snackVisibility }) => {
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
  );
};

export default SnackBarMessage;