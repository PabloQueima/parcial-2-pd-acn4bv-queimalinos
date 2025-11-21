export default function LandingPage() {
  return (
    <div
      style={{
        background: "url('/src/images/fondo.png') center/cover fixed",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <div style={{
        background: "rgba(255,255,255,0.9)",
        padding: "2rem 3rem",
        borderRadius: "12px",
        textAlign: "center"
      }}>
        <img
          src="/src/images/logo.png"
          alt="Logo"
          style={{ width: "120px", marginBottom: "1rem" }}
        />

        <h1 style={{ marginBottom: "1.5rem", color: "#0C3264" }}>
          Plataforma de Entrenamiento
        </h1>

        <button
          onClick={() => (window.location.href = "/login")}
          style={{
            padding: "0.8rem 1.5rem",
            backgroundColor: "#05A3CB",
            border: "none",
            color: "white",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          Ingresar
        </button>
      </div>
    </div>
  );
}
