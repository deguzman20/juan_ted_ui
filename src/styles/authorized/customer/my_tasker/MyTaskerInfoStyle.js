import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  rect: {
    top: 0,
    left: 0,
    width: '100%',
    height: 181,
    position: "absolute",
    alignItems: 'stretch',
    backgroundColor: "#E6E6E6"
  },
  taskerImage: {
    top: 90,
    left: '2%',
    position: "absolute"
  },
  fullNameTxt: {
    top: 198,
    left: '20%',
    position: "absolute",
    fontFamily: "verdana",
    color: "#121212",
    fontSize: 20
  },
  rectStack: {
    top: 0,
    left: 0,
    width: '210%',
    height: 281,
    position: "absolute"
  },
  featuredSkills: {
    top: 257,
    left: 20,
    position: "absolute",
    fontFamily: "verdana",
    color: "#121212",
    fontSize: 20
  },
  rectStackStack: {
    width: 428,
    height: 281
  },
  chipWrapper: {
    flex: 1,
    height: 30,
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 20,
    width: '90%',
    marginLeft: '5%',
    alignContent: 'center'    
  },
  reviewWrapper: {
    flex: 1,
    height: 30,
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 20,
    width: '90%',
    height: '100%',
    marginLeft: '5%',
    alignContent: 'center'    
  },
  introduction: {
    fontFamily: "verdana",
    color: "#121212",
    fontSize: 20,
    marginTop: 27,
    marginLeft: 20
  },
  introductionContent: {
    fontFamily: "verdana",
    color: "#121212",
    fontSize: 15,
    marginTop: '5%',
    marginLeft: '5%'
  },
  firstDivider: {
    backgroundColor: 'silver', 
    top: '90%', 
    marginLeft: '5%', 
    marginRight: '7.6%'
  },
  secondDivider: {
    backgroundColor: 'silver', 
    top: 20, 
    marginLeft: '5%', 
    marginRight: '5%' 
  },
  fullNameWrapper: {
    position: 'absolute', 
    top: -8
  },
  ratingWrapper: {
    position: 'absolute', 
    top: 0
  },
  fullNameTxtOnList: {
    fontWeight: 'bold'
  },
  back: {
    fontFamily: "verdana",
    color: "#121212",
    marginTop: 65,
    marginLeft: 35
  }
});