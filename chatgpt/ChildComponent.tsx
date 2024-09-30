import React, { useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Modal } from 'react-native';

interface ChildProps {
  title: string;
  childData: any[];
  childDetailComponent: React.FC<any>;
  childDetailEditComponent: React.FC<any>;
  onUpdate: (updatedChildren: any[]) => void;
}

const ChildComponent: React.FC<ChildProps> = ({
  title,
  childData,
  childDetailComponent: ChildDetail,
  childDetailEditComponent: ChildDetailEdit,
  onUpdate,
}) => {
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedChild, setSelectedChild] = useState<any>(null);

  // Handle Add Child
  const addChild = () => {
    const newChild = { id: (childData[childData.length - 1]?.id || 0) + 1 };
    onUpdate([...childData, newChild]);
  };

  // Handle Edit Child
  const editChild = (child: any) => {
    setSelectedChild(child);
    setIsEditModalVisible(true);
  };

  // Handle Save Edited Child
  const saveEditedChild = (updatedChild: any) => {
    onUpdate(
      childData.map((child) =>
        child.id === updatedChild.id ? updatedChild : child
      )
    );
    setIsEditModalVisible(false);
  };

  // Handle Delete Child
  const deleteChild = (childId: number) => {
    onUpdate(childData.filter((child) => child.id !== childId));
  };

  return (
    <View style={localStyles.container}>
      <Text style={localStyles.title}>{title}</Text>

      {/* Add Child Button */}
      <Button title="Add" onPress={addChild} />

      {/* Child List */}
      <FlatList
        data={childData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={localStyles.childContainer}>
            {/* Render Child Detail */}
            <ChildDetail item={item} />

            {/* Edit and Delete Buttons */}
            <Button title="Edit" onPress={() => editChild(item)} />
            <Button title="Delete" onPress={() => deleteChild(item.id)} />
          </View>
        )}
      />

      {/* Edit Child Modal */}
      <Modal visible={isEditModalVisible} animationType="slide">
        <ChildDetailEdit
          item={selectedChild}
          onSave={saveEditedChild}
          onCancel={() => setIsEditModalVisible(false)}
        />
      </Modal>
    </View>
  );
};

const localStyles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  childContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
});

export default ChildComponent;
