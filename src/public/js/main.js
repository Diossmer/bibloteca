import { initTheme } from './modules/theme.js';
import { changeTab, editRecord, resetForm, filterData, handleFormSubmit, deleteRecord } from './modules/ui.js';

window.changeTab = changeTab;
window.handleFormSubmit = handleFormSubmit;
window.editRecord = editRecord;
window.deleteRecord = deleteRecord;
window.resetForm = resetForm;
window.filterData = filterData;

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    changeTab('libros');
});
