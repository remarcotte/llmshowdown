import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Modal, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const ChildComponent = ({
  data,
  title,
  onDataChange,
  childDetailComponent: ChildDetail,
  editComponent: EditComponent
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const handleAddNew = () => {
    const newId = Math.max(...data.map(item => item.id), 0) + 1;
    const newItem = { id: newId };
    onDataChange([...data, newItem]);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setIsModalVisible(true);
  };

  const handleDelete = (id) => {
    onDataChange(data.filter(item => item.id !== id));
  };

  const handleSaveEdit = (editedItem) => {
    onDataChange(data.map(item => item.id === editedItem.id ? editedItem : item));
    setIsModalVisible(false);
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <ChildDetail item={item} />
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => handleEdit(item)}>
          <Ionicons name="pencil" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(item.id)}>
          <Ionicons name="trash" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity onPress={handleAddNew}>
          <Ionicons name="add-circle" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
      <Modal visible={isModalVisible} animationType="slide">
        <EditComponent
          item={editingItem}
          onSave={handleSaveEdit}
          onCancel={() => setIsModalVisible(false)}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  iconContainer: {
    flexDirection: 'row',
  },
});