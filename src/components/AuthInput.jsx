export default function AuthInput({
  type = "text",
  placeholder,
  value,
  onChange,
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={styles.input}
    />
  );
}

const styles = {
  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    background: "#d6d6d6",
  },
};
