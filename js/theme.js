/**
 * Theme Toggling & Syncing Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle'); // Checkbox in dashboard settings
    const themeToggleLanding = document.getElementById('theme-toggle-landing'); // Button on landing page header
    const themeToggleDashboard = document.getElementById('theme-toggle-dashboard'); // Button on dashboard header
    const rootElement = document.documentElement;

    function applyTheme(theme) {
        if (theme === 'light') {
            rootElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            if (themeToggle) themeToggle.checked = false;
            [themeToggleLanding, themeToggleDashboard].forEach(el => {
                if (el) {
                    const knob = el.querySelector('.theme-knob') || el.querySelector('#themeKnob');
                    const lbl = el.querySelector('.theme-pill-lbl') || el.querySelector('#themeLbl');
                    if (knob) knob.textContent = '☀️';
                    if (lbl) lbl.textContent = 'Light';
                    const icon = el.querySelector('i');
                    if (icon) icon.className = 'fa-solid fa-moon';
                }
            });
        } else {
            rootElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            if (themeToggle) themeToggle.checked = true;
            [themeToggleLanding, themeToggleDashboard].forEach(el => {
                if (el) {
                    const knob = el.querySelector('.theme-knob') || el.querySelector('#themeKnob');
                    const lbl = el.querySelector('.theme-pill-lbl') || el.querySelector('#themeLbl');
                    if (knob) knob.textContent = '🌙';
                    if (lbl) lbl.textContent = 'Dark';
                    const icon = el.querySelector('i');
                    if (icon) icon.className = 'fa-solid fa-sun';
                }
            });
        }
        
        // Dynamically update charts if they are loaded
        if (typeof applyChartTheme === 'function') {
            applyChartTheme();
        }
    }

    // Check for saved preference or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    applyTheme(savedTheme);

    // Event listener for the dashboard checkbox toggle
    if (themeToggle) {
        themeToggle.addEventListener('change', (e) => {
            const newTheme = e.target.checked ? 'dark' : 'light';
            applyTheme(newTheme);
        });
    }

    // Event listener for the header button toggles
    [themeToggleLanding, themeToggleDashboard].forEach(el => {
        if (el) {
            el.addEventListener('click', () => {
                const currentTheme = rootElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
                const newTheme = currentTheme === 'light' ? 'dark' : 'light';
                applyTheme(newTheme);
            });
        }
    });
});
