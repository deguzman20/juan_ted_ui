import React, { Component, memo } from 'react'
import { View, Text } from 'react-native';

class LinkScreen extends Component {
  render() {
    return (
       <>
          <View>
            <Text>{this.props.link.description}</Text>
          </View>
          <View>
            <Text>{this.props.link.url}</Text>
          </View>
      </>
    )
  } 
}

export default memo(LinkScreen)