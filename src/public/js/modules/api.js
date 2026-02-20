import { state } from './state.js';

export const fetchRecords = async () => {
    const res = await fetch(`/api/${state.currentModel}`);
    if (!res.ok) throw new Error(await res.text());
    return await res.json();
};

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

export const removeRecord = async (id) => {
    const res = await fetch(`/api/${state.currentModel}/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error(await res.text());
    return res;
};
