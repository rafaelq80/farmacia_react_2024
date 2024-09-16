import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../store/AuthStore";
import { ToastAlerta } from "../../../utils/ToastAlerta";

// Estilos separados em constantes
const styles = {
  container: "container mx-auto rounded-2xl overflow-hidden",
  coverImage: "w-full mt-4 h-72 object-cover border-b-8 border-white rounded-t-2xl",
  profileImage: "rounded-full w-56 mx-auto mt-[-8rem] border-8 border-white relative z-10",
  profileDetails: "relative mt-[-5rem] mb-4 h-72 flex flex-col bg-cyan-400 text-black text-2xl items-center justify-center rounded-b-2xl",
  editButtonContainer: "flex flex-wrap mt-4",
  editButton: "rounded text-slate-100 bg-indigo-700 hover:bg-indigo-900 px-6 py-2 mx-auto flex justify-center"
};

function Perfil() {
  let navigate = useNavigate();
  const { usuario } = useAuthStore();

  useEffect(() => {
    if (usuario.token === "") {
      ToastAlerta("Você precisa estar logado!", "info");
      navigate("/");
    }
  }, [usuario.token]);

  return (
    <div className={styles.container}>
      <img
        className={styles.coverImage}
        src="https://ik.imagekit.io/vzr6ryejm/farmacia/profile.jpg?updatedAt=1725794720336"
        alt="Capa do Perfil"
      />
      <img
        src={usuario.foto}
        alt="Foto de perfil"
        className={styles.profileImage}
      />
      <div className={styles.profileDetails}>
        <p>{usuario.nome}</p>
        <p>{usuario.usuario}</p>
        <div className={styles.editButtonContainer}>
          <Link to={`/atualizarusuario`} className={styles.editButton}>
            <button>Editar Perfil</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Perfil;
