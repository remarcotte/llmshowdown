import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { ParentComponent } from './ParentComponent';
import { ChildComponent } from './ChildComponent';

// Top Section Component
const TopSection = ({ data, onDataChange }) => (
  <View>
    <Text>Name:</Text>
    <TextInput
      value={data.name}
      onChangeText={(text) => onDataChange({ ...data, name: text })}
      style={styles.input}
    />
  </View>
);

// Child Detail Component
const ChildDetail = ({ item }) => (
  <View>
    <Text>{item.name} - {item.role}</Text>
  </View>
);

// Child Edit Component
const ChildEditComponent = ({ item, onSave, onCancel }) => {
  const [name, setName] = React.useState(item.name);
  const [role, setRole] = React.useState(item.role);

  const handleSave = () => {
    onSave({ ...item, name, role });
  };

  return (
    <View style={styles.editContainer}>
      <Text>Edit Team Member</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Name"
        style={styles.input}
      />
      <TextInput
        value={role}
        onChangeText={setRole}
        placeholder="Role"
        style={styles.input}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleSave} style={styles.button}>
          <Text>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onCancel} style={styles.button}>
          <Text>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Sample data
const initialData = {
  id: 1,
  name: "Project Alpha",
  team: [
    { id: 1, name: "John Doe", role: "Developer" },
    { id: 2, name: "Jane Smith", role: "Designer" },
  ]
};

// Main App Component
export default function App() {
  const handleSave = (data) => {
    console.log("Saving data:", data);
    // Implement your save logic here
  };

  const handleDelete = (id) => {
    console.log("Deleting item with id:", id);
    // Implement your delete logic here
  };

  return (
    <View style={styles.container}>
      <ParentComponent
        topSectionComponent={TopSection}
        childComponent={ChildComponent}
        childEditComponent={ChildEditComponent}
        data={initialData}
        childAttribute="team"
        onSave={handleSave}
        onDelete={handleDelete}
        parentTitle="Project Details"
        childTitle="Team Members"
        childDetailComponent={ChildDetail}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 10,
  },
  editContainer: {
    padding: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  button: {
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
  },
});