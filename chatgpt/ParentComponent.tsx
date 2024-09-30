import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import ChildComponent from './ChildComponent';

// Types
interface ParentProps {
  title: string; // Title for the parent section
  data: any; // The full data object (e.g., game data)
  childKey: string; // Key in data containing child details (e.g., 'clues')
  topSection: React.FC<any>; // Component for top section
  childDetailComponent: React.FC<any>; // Component to render each child
  childDetailEditComponent: React.FC<any>; // Component to edit a child
  saveData: (updatedData: any) => void; // Function to save the updated data
  deleteData: () => void; // Function to delete the data
  styles?: any; // Optional styles for customization
}

const ParentComponent: React.FC<ParentProps> = ({
  title,
  data,
  childKey,
  topSection: TopSection,
  childDetailComponent,
  childDetailEditComponent,
  saveData,
  deleteData,
  styles,
}) => {
  // State to track current data and changes
  const [currentData, setCurrentData] = useState(data);
  const [isModified, setIsModified] = useState(false);

  useEffect(() => {
    setCurrentData(data);
  }, [data]);

  // Check if any data was changed
  useEffect(() => {
    setIsModified(JSON.stringify(data) !== JSON.stringify(currentData));
  }, [currentData]);

  // Handle Save
  const handleSave = () => {
    if (isModified) {
      saveData(currentData);
    }
  };

  // Handle Cancel
  const handleCancel = () => {
    setCurrentData(data); // Reset to original data
  };

  // Handle Delete
  const handleDelete = () => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this item?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: deleteData },
      ]
    );
  };

  // Handle updates from ChildComponent
  const handleChildUpdate = (updatedChildren: any[]) => {
    setCurrentData({
      ...currentData,
      [childKey]: updatedChildren,
    });
  };

  return (
    <View style={[styles?.container, localStyles.container]}>
      <Text style={styles?.title}>{title}</Text>

      {/* Top Section */}
      <TopSection data={currentData} onUpdate={setCurrentData} />

      {/* Child Component */}
      <ChildComponent
        title={`${title} Details`}
        childData={currentData[childKey]}
        childDetailComponent={childDetailComponent}
        childDetailEditComponent={childDetailEditComponent}
        onUpdate={handleChildUpdate}
      />

      {/* Buttons */}
      <View style={styles?.buttonContainer}>
        <Button title="Cancel" onPress={handleCancel} />
        <Button title="Save" onPress={handleSave} disabled={!isModified} />
        <Button title="Delete" onPress={handleDelete} />
      </View>
    </View>
  );
};

const localStyles = StyleSheet.create({
  container: {
    padding: 16,
  },
});

export default ParentComponent;
