export default function AuthButton({ text, onClick, loading }) {
  return (
    <button onClick={onClick} disabled={loading} style={styles.button}>
      {loading ? "Cargando..." : text}
    </button>
  );
}

const styles = {
  button: {
    padding: "10px",
    borderRadius: "20px",
    border: "none",
    background: "#333",
    color: "#fff",
    cursor: "pointer",
  },
};
