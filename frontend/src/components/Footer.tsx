function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#f5f5f5",
        padding: "20px",
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
        color: "#555",
        marginTop: "40px",
        borderTop: "1px solid #ddd",
      }}
    >
      <p style={{ marginBottom: "8px" }}>
        &copy; {new Date().getFullYear()} ResSmart.se – Din hjälp att hitta
        billiga flygresor.
      </p>
      <p style={{ marginBottom: "0" }}>
        Skolprojekt av Hussein Asghari – endast för utbildningssyfte.
      </p>
    </footer>
  );
}

export default Footer;
