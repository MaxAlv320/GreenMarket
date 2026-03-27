import AuthButton from "./AuthButton";
import AuthCard from "./AuthCard";
import AuthFooter from "./AuthFooter";
import AuthInput from "./AuthInput";

export default function LoginForm({
  email,
  password,
  setEmail,
  setPassword,
  onSubmit,
  loading,
  error,
}) {
  return (
    <AuthCard title="LOGIN">
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

      <AuthButton text="Entrar" onClick={onSubmit} loading={loading} />

      {error && (
        <p style={{ color: "red", fontSize: "12px", textAlign: "center" }}>
          {error}
        </p>
      )}

      <AuthFooter />
    </AuthCard>
  );
}
