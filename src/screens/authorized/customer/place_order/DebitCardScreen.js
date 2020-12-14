import React, { memo } from 'react';
import { SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";

const DebitCardScreen = ({ customer_id, navigation }) => {

  return(
    <>
      <CreditCardInput />
    </>
  )
}

const mapStateToProps = ({ customerReducer }) => {
  return {
    customer_id: customerReducer.id
  }
}

export default memo(connect(mapStateToProps, null)(DebitCardScreen));