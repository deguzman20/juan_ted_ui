import { StyleSheet } from 'react-native';
import { theme } from './../../../../core/theme';


export const styles = StyleSheet.create({
  label: {
    color: theme.colors.secondary,
  },
  button: {
    marginTop: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  chipWrapper: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'flex-start',
    marginTop: 20
  },
  chipStyle: {
    marginTop: 20, 
    alignItems: 'center',
  }
});
