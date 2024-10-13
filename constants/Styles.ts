import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
  container: {
    padding: 20,
    display:'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
        // width: '100%'
    //height:'100%'
  },
  input: {
    borderWidth: 1,
    borderColor: '#1E90FF',
    padding: 10,
    marginTop: 5,
    marginBottom: 20,
    backgroundColor: '#FFFACD',
    borderRadius: 5,
    fontSize: 20,
  },
  label: {
    color: '#1E90FF',
    fontSize: 25,
  },
  textButton: {
    alignSelf: 'center',
    fontWeight: 'bold',
    color: '#1E90FF', // Colors.light.tint,
    marginVertical: 15,
    fontSize: 20,
  },
  opacity: {
    alignSelf: 'center',
    borderColor: '#1E90FF',
    borderWidth: 1,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: '#FFFACD',
    width: '100%'
  }
})
export default styles