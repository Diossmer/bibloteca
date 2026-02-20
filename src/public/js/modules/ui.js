import { state } from './state.js';
import { MODELS_CONFIG } from './config.js';
import { fetchRecords, saveRecord, removeRecord } from './api.js';

const q = id => document.getElementById(id);

/** Convierte una cadena de fecha en un formato ISO compatible con los inputs de tipo date. */
export const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    try {
        const d = new Date(dateString);
        if (isNaN(d.getTime())) return '';
        return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}-${String(d.getUTCDate()).padStart(2, '0')}`;
    } catch (e) { return ''; }
};

/** Filtra la lista de datos en tiempo real basándose en la entrada de búsqueda del usuario. */
export const filterData = () => {
    const query = q('searchInput').value.toLowerCase();
    const config = MODELS_CONFIG[state.currentModel].fields;

    const filtered = state.currentData.filter(item => {
        return config.some(f => String(item[f.name] || '').toLowerCase().includes(query));
    });

    if (q('recordCount')) q('recordCount').innerText = `${filtered.length}`;
    renderDataList(filtered);
};

/** Controla la visibilidad de los indicadores de carga tanto en formularios como en tablas. */
export const setLoader = (type, show) => {
    const el = type === 'form' ? q('formLoader') : q('tableLoader');
    if (el) show ? el.classList.remove('hidden') : el.classList.add('hidden');

    if (type === 'table') {
        const list = q('dataListContainer');
        if (list) show ? list.classList.add('hidden') : list.classList.remove('hidden');
    } else {
        const formInner = q('dynamicFieldsContainer');
        const sBtn = q('submitBtn');
        if (formInner) formInner.style.opacity = show ? '0.3' : '1';
        if (sBtn) sBtn.style.opacity = show ? '0.3' : '1';
    }
};

/** Orquesta el cambio de pestaña, actualizando la configuración del formulario y recargando datos. */
export const changeTab = async (modelName) => {
    state.currentModel = modelName;
    const config = MODELS_CONFIG[modelName];

    document.querySelectorAll('.tab-btn').forEach(btn => {
        if (btn.dataset.target === modelName) {
            btn.className = 'tab-btn px-4 py-1.5 text-sm font-semibold rounded-md transition-all shadow-sm bg-white dark:bg-[#18181b] text-slate-900 dark:text-white shrink-0 border border-slate-200 dark:border-white/10';
            btn.querySelector('span').classList.remove('opacity-50');
        } else {
            btn.className = 'tab-btn px-4 py-1.5 text-sm font-medium rounded-md transition-all text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-[#18181b] shrink-0 border border-transparent';
            btn.querySelector('span').classList.add('opacity-50');
        }
    });

    if (q('listTitle')) q('listTitle').innerText = config.title;
    if (q('listDescription')) q('listDescription').innerText = config.desc;

    const searchInp = q('searchInput');
    if (searchInp) searchInp.value = '';

    resetForm();
    await renderFormFields(config.fields);
    await loadData();
};

/** Construye dinámicamente los campos del formulario según la configuración del modelo activo. */
export const renderFormFields = async (fields) => {
    const container = q('dynamicFieldsContainer');
    container.innerHTML = '';
    let rowDiv = null;

    for (const field of fields) {
        const wrapper = document.createElement('div');
        const baseInputStyles = 'w-full bg-slate-50 dark:bg-[#09090b] border border-slate-200 dark:border-[#27272a] px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors placeholder-slate-400 dark:placeholder-slate-500 rounded-lg shadow-sm';

        let inputHtml = '';
        if (field.type === 'textarea') {
            inputHtml = `<textarea name="${field.name}" ${field.required ? 'required' : ''} class="${baseInputStyles} resize-none" rows="3"></textarea>`;
        } else if (field.type === 'select') {
            let optionsHtml = '<option value="">Seleccionar...</option>';
            try {
                const data = await fetchRecords(field.source);
                data.forEach(item => {
                    const label = item.titulo || item.nombre || item._id;
                    optionsHtml += `<option value="${item._id}">${label}</option>`;
                });
            } catch (err) {
                console.error(`Error loading options for ${field.name}:`, err);
            }
            inputHtml = `<select name="${field.name}" ${field.required ? 'required' : ''} class="${baseInputStyles}">${optionsHtml}</select>`;
        } else {
            inputHtml = `<input type="${field.type}" name="${field.name}" ${field.required ? 'required' : ''} class="${baseInputStyles}">`;
        }

        wrapper.innerHTML = `
            <label class="block text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-1.5 tracking-wide uppercase">${field.label}</label>
            ${inputHtml}
        `;

        if (field.width === 'half') {
            wrapper.className = 'w-1/2 px-2';
            if (!rowDiv || !rowDiv.classList.contains('flex')) {
                rowDiv = document.createElement('div');
                rowDiv.className = 'flex -mx-2 mb-2';
                container.appendChild(rowDiv);
            }
            rowDiv.appendChild(wrapper);
        } else {
            wrapper.className = 'w-full mb-2';
            container.appendChild(wrapper);
            rowDiv = null;
        }
    }
};

/** Carga los registros desde la API y desencadena el renderizado de la lista principal. */
export const loadData = async () => {
    setLoader('table', true);
    try {
        state.currentData = await fetchRecords();
        const rc = q('recordCount');
        if (rc) rc.innerText = `${state.currentData.length}`;
        renderDataList(state.currentData);
    } catch (e) {
        console.error("Error cargando archivos: ", e);
    } finally {
        setLoader('table', false);
    }
};

/** Genera y renderiza las tarjetas de datos con soporte para acciones de edición y eliminación. */
export const renderDataList = (data) => {
    const container = q('dataListContainer');
    container.innerHTML = '';

    if (data.length === 0) {
        container.innerHTML = `
            <div class="col-span-full py-24 text-center flex flex-col items-center justify-center bg-white dark:bg-[#18181b] border border-dashed border-slate-300 dark:border-white/10 rounded-2xl shadow-sm">
                <p class="text-sm font-medium text-slate-500 dark:text-slate-400">No hay información registrada en este catálogo.</p>
            </div>`;
        return;
    }

    const fields = MODELS_CONFIG[state.currentModel].fields;

    data.forEach(item => {
        const card = document.createElement('div');
        card.className = 'bg-white dark:bg-[#18181b] border border-slate-200 dark:border-[#27272a] rounded-xl p-5 hover:border-slate-300 dark:hover:border-white/20 transition-all group flex flex-col h-full shadow-sm relative overflow-hidden';

        let titleHtml = '';
        let bodyHtml = '';

        fields.forEach((f, i) => {
            let val = item[f.name] || '—';
            if (f.type === 'date' && item[f.name]) val = item[f.name].substring(0, 10);
            if (f.type === 'text' && f.name === 'membresiaActiva') val = item[f.name] ? 'Activa' : 'Inactiva';

            if (i === 0) {
                titleHtml = `<h4 class="font-bold text-slate-900 dark:text-white pr-4 text-base line-clamp-2 leading-snug" title="${val}">${val}</h4>`;
            } else {
                bodyHtml += `
                    <div class="flex flex-col mt-3">
                        <span class="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-500">${f.label}</span>
                        <span class="text-sm text-slate-800 dark:text-slate-300 font-medium truncate mt-0.5" title="${val}">${val}</span>
                    </div>`;
            }
        });

        card.innerHTML = `
            <div class="flex justify-between items-start mb-2">
                <div class="flex-grow min-w-0 mr-3">
                    ${titleHtml}
                </div>
                <div class="flex items-center gap-1 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity shrink-0 bg-slate-50 dark:bg-[#27272a] p-1 rounded-md border border-slate-200 dark:border-white/5">
                    <button onclick="editRecord('${item._id}')" class="text-indigo-600 dark:text-indigo-400 hover:bg-white dark:hover:bg-[#3f3f46] p-1.5 rounded transition-colors shadow-sm" title="Editar">
                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                    </button>
                    <button onclick="deleteRecord('${item._id}')" class="text-rose-600 dark:text-rose-400 hover:bg-white dark:hover:bg-[#3f3f46] p-1.5 rounded transition-colors shadow-sm" title="Eliminar">
                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </button>
                </div>
            </div>
            <div class="flex-grow flex flex-col">
                ${bodyHtml}
            </div>
        `;
        container.appendChild(card);
    });
};

/** Procesa el envío del formulario, manejando la lógica de creación y actualización de registros. */
export const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoader('form', true);

    const formData = new FormData(e.target);
    const rawData = Object.fromEntries(formData.entries());
    const id = rawData._id;

    if (!id) delete rawData._id;
    if (state.currentModel === 'usuarios') {
        rawData.membresiaActiva = String(rawData.membresiaActiva).toLowerCase() === 'true';
    }

    try {
        await saveRecord(id, rawData);
        resetForm();
        await loadData();
    } catch (err) {
        alert('Error al incribir registro en el archivo: ' + err.message);
    } finally {
        setLoader('form', false);
    }
};

/** Prepara el formulario para la edición de un registro existente, poblando sus campos. */
export const editRecord = (id) => {
    const item = state.currentData.find(x => x._id === id);
    if (!item) return;

    resetForm();
    q('formTitle').innerText = 'Modificar Registro';
    const cancelBtn = q('cancelEditBtn');
    if (cancelBtn) cancelBtn.classList.remove('hidden');

    const sb = q('submitBtn');
    if (sb) {
        sb.innerHTML = 'Actualizar Datos';
        sb.className = 'w-full mt-4 bg-indigo-600 text-white font-bold py-2.5 rounded-xl hover:bg-indigo-700 transition-all text-sm shadow-md flex justify-center items-center gap-2';
    }

    const form = q('crudForm');
    form.querySelector('[name="_id"]').value = item._id;

    MODELS_CONFIG[state.currentModel].fields.forEach(f => {
        const input = form.querySelector(`[name="${f.name}"]`);
        if (input) {
            input.value = f.type === 'date' ? formatDateForInput(item[f.name]) : (item[f.name] || '');
        }
    });

    if (window.innerWidth < 1024) window.scrollTo({ top: 0, behavior: 'smooth' });
};

/** Limpia y restablece el formulario a su estado inicial de "Nuevo Registro". */
export const resetForm = () => {
    const form = q('crudForm');
    if (form) {
        form.reset();
        form.querySelector('[name="_id"]').value = '';
    }
    const t = q('formTitle');
    if (t) t.innerText = 'Nuevo Registro';

    const c = q('cancelEditBtn');
    if (c) c.classList.add('hidden');

    const s = q('submitBtn');
    if (s) {
        s.innerHTML = 'Guardar';
        s.className = 'w-full mt-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold py-2.5 rounded-xl hover:bg-slate-800 dark:hover:bg-gray-200 transition-all text-sm shadow-sm flex justify-center items-center gap-2';
    }
};

/** Ejecuta el flujo de eliminación con confirmación visual antes de remover permanentemente un registro. */
export const deleteRecord = async (id) => {
    const result = await Swal.fire({
        title: '¿Estás seguro?',
        text: "¡No podrás revertir esta acción!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#4f46e5',
        cancelButtonColor: '#e11d48',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
        background: document.documentElement.classList.contains('dark') ? '#18181b' : '#fff',
        color: document.documentElement.classList.contains('dark') ? '#f8fafc' : '#0f172a'
    });

    if (!result.isConfirmed) return;

    try {
        await removeRecord(id);
        await loadData();
        Swal.fire({
            title: '¡Eliminado!',
            text: 'El registro ha sido eliminado exitosamente.',
            icon: 'success',
            background: document.documentElement.classList.contains('dark') ? '#18181b' : '#fff',
            color: document.documentElement.classList.contains('dark') ? '#f8fafc' : '#0f172a'
        });
    } catch (e) {
        console.error(e);
        Swal.fire({
            title: 'Error',
            text: 'Hubo un problema al eliminar el registro: ' + e.message,
            icon: 'error',
            background: document.documentElement.classList.contains('dark') ? '#18181b' : '#fff',
            color: document.documentElement.classList.contains('dark') ? '#f8fafc' : '#0f172a'
        });
    }
};
