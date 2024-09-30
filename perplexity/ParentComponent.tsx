import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export const ParentComponent = ({
  topSectionComponent: TopSection,
  childComponent: ChildComponent,
  childEditComponent: ChildEditComponent,
  data,
  childAttribute,
  onSave,
  onDelete,
  parentTitle,
  childTitle,
  styles
}) => {
  const [localData, setLocalData] = useState(data);
  const [isDataChanged, setIsDataChanged] = useState(false);

  const handleDataChange = useCallback((newData) => {
    setLocalData(newData);
    setIsDataChanged(true);
  }, []);

  const handleSave = () => {
    onSave(localData);
    setIsDataChanged(false);
  };

  const handleDelete = () => {
    onDelete(localData.id);
  };

  return (
    <View style={[defaultStyles.container, styles?.container]}>
      <Text style={[defaultStyles.title, styles?.title]}>{parentTitle}</Text>
      <TopSection data={localData} onDataChange={handleDataChange} />
      <ChildComponent
        data={localData[childAttribute]}
        title={childTitle}
        onDataChange={handleDataChange}
        editComponent={ChildEditComponent}
      />
      <View style={defaultStyles.buttonContainer}>
        <TouchableOpacity style={defaultStyles.button}>
          <Text>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[defaultStyles.button, !isDataChanged && defaultStyles.disabledButton]}
          disabled={!isDataChanged}
          onPress={handleSave}
        >
          <Text>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={defaultStyles.button} onPress={handleDelete}>
          <Text>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const defaultStyles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  button: {
    padding: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
  },
  disabledButton: {
    opacity: 0.5,
  },
});