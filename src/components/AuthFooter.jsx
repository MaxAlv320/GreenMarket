export default function AuthFooter() {
  return (
    <div style={styles.container}>
      <div style={styles.dots}>
        <span style={styles.dot}></span>
        <span style={styles.dot}></span>
        <span style={styles.dot}></span>
      </div>
      <div style={styles.line}></div>
    </div>
  );
}

const styles = {
  container: {
    marginTop: "10px",
    textAlign: "center",
  },
  dots: {
    display: "flex",
    justifyContent: "center",
    gap: "6px",
    marginBottom: "6px",
  },
  dot: {
    width: "10px",
    height: "10px",
    background: "#999",
    borderRadius: "50%",
  },
  line: {
    height: "2px",
    background: "#bbb",
    width: "80%",
    margin: "0 auto",
  },
};
