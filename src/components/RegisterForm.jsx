import AuthButton from "./AuthButton";
import AuthCard from "./AuthCard";
import AuthFooter from "./AuthFooter";
import AuthInput from "./AuthInput";

export default function RegisterForm({
  name,
  email,
  password,
  setName,
  setEmail,
  setPassword,
  onSubmit,
  loading,
  error,
}) {
  return (
    <AuthCard title="REGISTER">
      <AuthInput
        type="text"
        placeholder="Nombre"
        value={name}
        onChange={setName}
      />

      <AuthInput
        type="email"
        placeholder="Email"
        value={email}
        onChange={setEmail}
      />

      <AuthInput
        type="password"
        placeholder="Password"
        value={password}
        onChange={setPassword}
      />

      <AuthButton text="Registrarse" onClick={onSubmit} loading={loading} />

      {error && (
        <p style={{ color: "red", fontSize: "12px", textAlign: "center" }}>
          {error}
        </p>
      )}

      <AuthFooter />
    </AuthCard>
  );
}
