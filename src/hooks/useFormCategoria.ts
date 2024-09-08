import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Categoria from "../models/Categoria";
import { atualizar, cadastrar, listar } from "../services/Service";
import { useAuthStore } from "../store/AuthStore";
import { ToastAlerta } from "../utils/ToastAlerta";

export function useFormCategoria() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const { usuario, handleLogout } = useAuthStore();
    const token = usuario.token;

    const [categoria, setCategoria] = useState<Categoria>({} as Categoria);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const headers = {
        Authorization: token,
    };

    useEffect(() => {
        if (!token) {
            ToastAlerta('Você precisa estar logado!', 'info');
            navigate('/');
            return;
        }

        if (id) {
            fetchCategoria(id);
        }
    }, [id, token, navigate]);

    async function fetchCategoria(id: string) {
        try {
            await listar(`/categorias/${id}`, setCategoria, { headers });
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout();
            } else {
                ToastAlerta('Categoria não encontrada!', 'erro');
                navigate("/categorias");
            }
        }
    }

    function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
        setCategoria({
            ...categoria,
            [e.target.name]: e.target.value
        });
    }

    async function handleSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (id) {
                await atualizar(`/categorias`, categoria, setCategoria, { headers });
                ToastAlerta('Categoria atualizada com sucesso', 'sucesso');
            } else {
                await cadastrar(`/categorias`, categoria, setCategoria, { headers });
                ToastAlerta('Categoria cadastrada com sucesso', 'sucesso');
            }
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout();
            } else {
                ToastAlerta(`Erro ao ${id ? 'Atualizar' : 'Cadastrar'} a Categoria`, 'erro');
            }
        } finally {
            setIsLoading(false);
            navigate("/categorias");
        }
    }

    return {
        categoria,
        isLoading,
        handleInputChange,
        handleSubmit,
        isEdit: !!id // Se id estiver definido, retorna true
    };
}
