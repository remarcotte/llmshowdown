import React from 'react';
import { View, Text, TextInput } from 'react-native';
import ParentComponent from './ParentComponent';
import { StyleSheet } from 'react-native';

const MyTopSection = ({ data, onUpdate }) => (
  <View>
    <Text>Top Section Title</Text>
    <TextInput
      value={data.title}
      onChangeText={(text) => onUpdate({ ...data, title: text })}
    />
  </View>
);

const MyChildDetail = ({ item }) => (
  <View>
    <Text>{`Child Item ${item.id}`}</Text>
  </View>
);

const MyChildDetailEdit = ({ item, onSave, onCancel }) => (
  <View>
    <Text>Edit Child</Text>
    <TextInput
      value={item.name}
      onChangeText={(text) => onSave({ ...item, name: text })}
    />
    <Button title="Cancel" onPress={onCancel} />
  </View>
);

const MyParentScreen = () => {
  const myData = { id: 1, title: 'Parent Title', children: [{ id: 1, name: 'Child 1' }] };

  return (
    <ParentComponent
      title="My Parent Component"
      data={myData}
      childKey="children"
      topSection={MyTopSection}
      childDetailComponent={MyChildDetail}
      childDetailEditComponent={MyChildDetailEdit}
      saveData={(data) => console.log('Saving:', data)}
      deleteData={() => console.log('Deleting')}
      styles={{ container: styles.container }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});

export default MyParentScreen;
