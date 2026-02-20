import { state } from './state.js';

/** Ejecuta una petición GET para obtener todos los registros del modelo especificado. */
export const fetchRecords = async (modelName = state.currentModel) => {
    const res = await fetch(`/api/${modelName}`);
    if (!res.ok) throw new Error(await res.text());
    return await res.json();
};

/** Gestiona la persistencia de datos, alternando entre creación (POST) y actualización (PUT). */
export const saveRecord = async (id, rawData) => {
    const url = id ? `/api/${state.currentModel}/${id}` : `/api/${state.currentModel}`;
    const res = await fetch(url, {
        method: id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(rawData)
    });
    if (!res.ok) throw new Error(await res.text());
    return res;
};

/** Solicita la eliminación física de un registro del servidor basado en su ID. */
export const removeRecord = async (id) => {
    const res = await fetch(`/api/${state.currentModel}/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error(await res.text());
    return res;
};
