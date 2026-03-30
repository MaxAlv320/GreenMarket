import { Button, Text, TextInput, View } from 'react-native';
import { useProfile } from '../hooks/useProfile';

export default function ViewProfile() {
  const {
    name,
    email,
    branch,
    setName,
    setEmail,
    setBranch,
    saveProfile
  } = useProfile();

  return (
    <View style={{ padding: 20 }}>
      <Text>Perfil</Text>

      <TextInput
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Sucursal"
        value={branch}
        onChangeText={setBranch}
      />

      <Button title="Guardar cambios" onPress={saveProfile} />
    </View>
  );
}