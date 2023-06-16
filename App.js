import React from 'react';
import { useEffect,useState,useCallback } from 'react';
import { View, StyleSheet, TextInput,Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Navbar from './components/Navbar';


const App = () => {

  const [gridData, setGridData] = useState([[[],[],[],[],[]],
    [[],[],[],[],[]],
    [[],[],[],[],[]],
    [[],[],[],[],[]],
    [[],[],[],[],[]],
    [[],[],[],[],[]],
    [[],[],[],[],[]],
    [[],[],[],[],[]],
    [[],[],[],[],[]],
    [[],[],[],[],[]],
  ]);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(()=>{
    saveData();
  },[gridData])

  const loadData = async () => {
    try {
      const savedData = await AsyncStorage.getItem('sheetData');
      if (savedData) {
        setGridData(JSON.parse(savedData));
      }
    } catch (error) {
      console.log('Error loading data:', error);
    }
  };

  const saveData = useCallback(
    async () => {
      try {
        await AsyncStorage.setItem('sheetData', JSON.stringify(gridData));
        // console.log(gridData);
      } catch (error) {
        console.log('Error saving data:', error);

      }
    },
    [gridData]
  );

  const handleCellChange = (rowIndex, colIndex, value) => {
    const updatedGridData = [...gridData];
    updatedGridData[rowIndex] = updatedGridData[rowIndex] || [];
    updatedGridData[rowIndex][colIndex] = value;
    setGridData(updatedGridData);
  };

  //  const lableArray = Array(10).fill(null);

  return (
    <>
    <Navbar style={styles.navbar} gridData={gridData}/>
    {/* <View style={styles.container}>
      <View style={styles.headingColumn}> 
    {lableArray.map((_,idx)=>( 
      <View key={`${idx+Math.random()}`} style={styles.labelCell}> 
      <Text style={styles.labelText}> 
      {idx+1} 
      </Text> 
      </View> 
    ))
    }
    
      </View> */}
      {gridData.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.gridRow}>
          {row.map((cell, colIndex) => (
            <View style={styles.gridCell} key={`${rowIndex}-${colIndex}`}>
            <TextInput
              style={styles.cellText}
              value={cell || ''}
              onChangeText={(value) => handleCellChange(rowIndex, colIndex, value)}
            />
            </View>
          ))}
        </View>
      ))}
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    backgroundColor: '#f2f2f2',
  },
  gridRow: {
    flexDirection: 'row',
  },
  gridCell: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding:0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellText: {
    fontSize: 18,
    fontWeight: 'bold',
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
  labelCell: {
    width: 78,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderWidth: 1,
    borderColor: '#cccccc',
    flexDirection:'row',
  },
  labelText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333333',
  },
  headingColumn: {
    flexDirection: 'row',
  },
});


export default App;
