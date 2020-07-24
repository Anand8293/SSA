import React from 'react'
import { Appearance, View, Button, Picker, StyleSheet, Platform } from 'react-native';
import { colors } from 'react-native-elements';

export const renderIosPicker = (pickerData, selectedIndex = 0, onValueChange) => {
  return (
    <View style={[styles.dropDownIos, { padding: 1, marginBottom: -10 }]}>
      <Button style={{ alignSelf: 'flex-end' }}
        onPress={() => {
          onValueChange(selectedIndex)
        }}
        title="Done"
      />
      <Picker
        selectedValue={pickerData[selectedIndex].value}
        onValueChange={(itemValue, itemIndex) => onValueChange(itemIndex)}
        mode={'dropdown'}>
        {
          pickerData.map((data, key) => {
            return (
              <Picker.Item color='black' label={data.label} value={data.value} />
            )
          })
        }
      </Picker>
    </View>)
}
export const renderAndroidPicker = (pickerData, selectedIndex = 0, onValueChange) => {
  return (
    <Picker
      style={{ height: 30, width: 120 }}
      selectedValue={pickerData[selectedIndex].value}
      onValueChange={(itemValue, itemIndex) => onValueChange(itemIndex)}
      mode={'dropdown'}>
      {
        pickerData.map((data, key) => {
          return (
            <Picker.Item color='#9695AE' label={data.label} value={data.value} />
          )
        })
      }
    </Picker>)
}

export function Divider({ color }) {
  return (
    <View
      style={{
        width: '100%',
        height: 1,
        backgroundColor: color ? color : '#2B3566',
      }}
    />
  );
}

const styles = StyleSheet.create({
  dropDownIos: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    left: -10,
    right: -10,
    backgroundColor: 'rgba(211, 211, 211, 0.95)',
  },
  dropDown: {
    width: 120,
    position: 'absolute',
    bottom: 0,
    left: -10,
    right: -10,
    backgroundColor: 'rgba(211, 211, 211, 0.95)',
  },
}) 