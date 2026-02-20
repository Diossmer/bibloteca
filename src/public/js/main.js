/** Importación de módulos core para la inicialización del sistema. */
import { initTheme } from './modules/theme.js';
import { changeTab, editRecord, resetForm, filterData, handleFormSubmit, deleteRecord } from './modules/ui.js';

/** Exposición de funciones al scope global para permitir su invocación desde el HTML (EJS). */
window.changeTab = changeTab;
window.handleFormSubmit = handleFormSubmit;
window.editRecord = editRecord;
window.deleteRecord = deleteRecord;
window.resetForm = resetForm;
window.filterData = filterData;

/** Disparador principal que arranca la lógica de la UI una vez el DOM está completamente cargado. */
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    changeTab('libros');
});
