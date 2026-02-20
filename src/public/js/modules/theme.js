export function initTheme() {
    const themeBtn = document.getElementById('themeToggleBtn');
    const lightIcon = document.getElementById('themeToggleLightIcon');
    const darkIcon = document.getElementById('themeToggleDarkIcon');

    if (!themeBtn || !lightIcon || !darkIcon) return;

    const updateIcons = () => {
        if (document.documentElement.classList.contains('dark')) {
            lightIcon.classList.remove('hidden');
            darkIcon.classList.add('hidden');
        } else {
            darkIcon.classList.remove('hidden');
            lightIcon.classList.add('hidden');
        }
    };

    updateIcons();

    themeBtn.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
        localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
        updateIcons();
    });
}
