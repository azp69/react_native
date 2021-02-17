import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, CheckBox, TextInput, ActionSheetIOS, Button } from 'react-native';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

enum CarType {
  StationWagon,
  Sedan,
  Sport
}

interface IRadioProps {
  label : string,
  value : number
}

interface IFormValues {
  Name : string,
  Owns : boolean,
  Age : number,
  ShowAdditional : boolean,
  FourWheel : boolean,
  Type : CarType
}

var radio_props = [
  {label: 'Station wagon', value: 0 },
  {label: 'Sedan', value: 1 },
  {label: 'Sport', value: 2 }
] as IRadioProps[];

export default function App() {

  const [name, setName] = useState<string>('');
  const [isOwner, setOwner] = useState<boolean>(false);
  const [age, setAge] = useState<string>('');
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const [awd, setAwd] = useState<boolean>(false);
  const [carType, setCarType] = useState<CarType>(0);
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const [ageError, setAgeError] = useState<boolean>(false);
  const [nameError, setNameError] = useState<boolean>(false);

  const onChangeName = (value : string) => {
    setName(value);
  } 

  const onChangeAge = (value : string) => {
    setAge(value.replace(/[^0-9]/g, ''));
  } 

  const onChangeOwner = (value : boolean) => {
    setOwner(value);
  }

  const onChangeAdvanced = (value : boolean) => {
    setShowAdvanced(value);
  }

  const onChangeAwd = (value: boolean) => {
    setAwd(value);
  }

  const onCarTypeChange = (value : any) => {
    setCarType(value);
  }

  const handleSave = () => {
    let errors = false;

    if (!(parseInt(age) > 0 && parseInt(age) < 11) && isOwner)
    {
      setAgeError(true);
      errors = true;
    }
    else {
      setAgeError(false);
    }

    if (name === '')
    {
      setNameError(true);
      errors = true;
    }
    else
      setNameError(false);

    if (!errors)
      setShowInfo(true);
    else 
      setShowInfo(false);
  }

  const selectedCarType = carType === CarType.Sedan ? 'Sedan' : carType === CarType.Sport ? 'Sport' : 'Station Wagon';
  
  return (
    <View style={styles.container}>
      <Text>Name</Text>
      {nameError ? <Text style={{color : '#F00'}}>Please enter your name</Text> : <></>}
      <TextInput onChangeText={text => onChangeName(text)} value={name} placeholder={'Name'}/>

      <View style={{ flexDirection: 'row'}}>
      <CheckBox value={isOwner} onValueChange={(value) => onChangeOwner(value)}/>
        <Text style={{marginTop : 5}}>Owns a car</Text>
      </View>

      <Text>Age of the car</Text>
      {ageError ? <Text style={{color : '#F00'}}>Age must be between 1 and 10</Text> : <></>}
      <TextInput onChangeText={text => onChangeAge(text)} value={age} editable={isOwner} placeholder={'Age'} keyboardType={'number-pad'}/>

      {showAdvanced ? 
      <>
        <View style={{ flexDirection: 'row'}}>
        <CheckBox value={awd} onValueChange={(value) => onChangeAwd(value)}/>
          <Text style={{marginTop : 5}}>4WD</Text>
        </View>
        <RadioForm 
          radio_props={radio_props}
          initial={0}
          onPress={(value : number) => {onCarTypeChange(value)}}
          value={carType}
        />
      </>
      :
      <></>
    }


      <View style={{ flexDirection: 'row'}}>
      <CheckBox value={showAdvanced} onValueChange={(value) => onChangeAdvanced(value)}/>
        <Text style={{marginTop : 5}}>Show advanced settings</Text>
      </View>

      <Button onPress={handleSave} title={'Save'}></Button>

      {showInfo ? 
      <>
        <Text>Name : {name}</Text>
        {isOwner ? <Text>Age: {age}</Text> : <></> }
        <Text>{isOwner ? 'Is owner' : 'Not owner'}</Text>
        {showAdvanced ? 
        <>
        <Text>4WD : {awd ? 'yes' : 'no'}</Text>
        <Text>Car type : {selectedCarType}</Text>
        </>
        : <></>
        }
      </>
      :
      <>
      </>}
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginLeft: 10
  },
});
