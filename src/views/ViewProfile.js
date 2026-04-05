import { ScrollView, Text, TextInput, TouchableOpacity } from "react-native";
import { useAuthContext } from "../context/authContext";
import { useProfile } from "../hooks/useProfile";

export default function ViewProfile() {
  const {
    nombreNegocio,
    descripcion,
    umbralStockBajo,
    umbralStockMedio,
    setNombreNegocio,
    setDescripcion,
    handleUpdatePerfil,
    productos
  } = useProfile();

  const { logout } = useAuthContext();

  //Stats
  const bajo = productos.filter((p) => p.stock < umbralStockBajo).length;

  const medio = productos.filter(
    (p) =>
      p.stock >= umbralStockBajo &&
      p.stock < umbralStockMedio
  ).length;

  const alto = productos.filter(
    (p) => p.stock >= umbralStockMedio
  ).length;

  return (
    <ScrollView style={{ padding: 20 }}>

      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        PERFIL
      </Text>

      {/* Nombre negocio */}
      <Text>Nombre del negocio</Text>
      <TextInput
        value={nombreNegocio}
        onChangeText={setNombreNegocio}
        style={{ borderWidth: 1, marginBottom: 10 }}
      />

      {/* Descripción */}
      <Text>Descripción</Text>
      <TextInput
        value={descripcion}
        onChangeText={setDescripcion}
        style={{ borderWidth: 1, marginBottom: 10 }}
      />

      {/* Guardar */}
      <TouchableOpacity
        onPress={handleUpdatePerfil}
        style={{ backgroundColor: "black", padding: 10 }}
      >
        <Text style={{ color: "white" }}>Guardar</Text>
      </TouchableOpacity>

      {/*LOGOUT */}
      <TouchableOpacity
        onPress={logout}
        style={{
          backgroundColor: "red",
          padding: 10,
          marginTop: 10,
        }}
      >
        <Text style={{ color: "white" }}>Cerrar sesión</Text>
      </TouchableOpacity>

      {/* STATS */}
      <Text style={{ marginTop: 30, fontWeight: "bold" }}>
        STATS
      </Text>

      <Text>Productos totales: {productos.length}</Text>
      <Text>Stock bajo: {bajo}</Text>
      <Text>Stock medio: {medio}</Text>
      <Text>Stock alto: {alto}</Text>

    </ScrollView>
  );
}
