export default function AuthCard({ title, children }) {
  return (
    <div style={styles.card}>
      <h2 style={styles.title}>{title}</h2>
      {children}
    </div>
  );
}

const styles = {
  card: {
    width: "260px",
    padding: "20px",
    borderRadius: "16px",
    background: "#e5e5e5",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#888",
  },
};
