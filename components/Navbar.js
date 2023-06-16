import React from 'react';
import { View, Text, TouchableOpacity,SafeAreaView } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

const Navbar = ({gridData}) => {

  const handleDownload = async () => {
    console.log(gridData)
    const fileUri = `${FileSystem.documentDirectory}grid_data.csv`;
    const fileContent = gridData.map(row => row.join(',')).join('\n');
    console.log(fileUri);

    try {
      await FileSystem.writeAsStringAsync(fileUri, fileContent);
      await Sharing.shareAsync(fileUri);
    } catch (error) {
      console.log('Error sharing file:', error);
    }
  };

  return (
    <SafeAreaView>
    <View style={styles.navbar}>
      <Text style={styles.logo}>MoneyApp</Text>
      <TouchableOpacity style={styles.button} onPress={handleDownload}>
        <Text style={styles.buttonText}>Download</Text>
      </TouchableOpacity>
    </View>
    </SafeAreaView>
  );
};

const styles = {
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 16,
    marginTop:40,
    paddingVertical: 8,
  },
  logo: {
    fontSize: 18,
    fontWeight: 'bold',
    color:'black'
  },
  button: {
    backgroundColor: 'green',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
};

export default Navbar;
