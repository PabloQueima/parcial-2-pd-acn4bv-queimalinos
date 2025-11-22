import { useEffect, useState } from "react";
import { getSesiones } from "../services/api";
import SesionesList from "../components/SesionesList";
import { getCurrentUser } from "../services/authService";

export default function MisSesionesPage() {
  const user = getCurrentUser();
  const clienteId = user?.id;

  const [sesiones, setSesiones] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    cargarMisSesiones();
  }, []);

  async function cargarMisSesiones() {
    setLoading(true);

    try {
      const data = await getSesiones();
      const mine = (data || []).filter(s => Number(s.clienteId) === clienteId);
      setSesiones(mine);
    } catch (err) {
      console.error("Error cargando sesiones:", err);
      setSesiones([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h2>Mis Sesiones</h2>

      {loading ? (
        <p>Cargando...</p>
      ) : (
        <SesionesList sesiones={sesiones} showAssignInfo={true} />
      )}
    </div>
  );
}
