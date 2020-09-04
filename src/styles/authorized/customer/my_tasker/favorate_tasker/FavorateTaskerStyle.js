import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  fullNameWrapper: {
    position: 'absolute', 
    top: -20
  },
  ratingWrapper: {
    position: 'absolute', 
    top: 5
  },
  empty_tasker_txt: {
    textAlign: 'center',
    color: 'black'
  },
  empty_tasker_container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  first_row_container: {
    flexDirection: 'row',
    height: 70,
  },
  second_row_container: {
    flex: 2, 
    flexDirection: 'row'
  },
  my_tasker_txt: {
    paddingLeft: 30,
    paddingTop: 20
  }
});