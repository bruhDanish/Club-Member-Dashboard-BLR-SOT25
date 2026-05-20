/**
 * Tab Navigation Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    const pageTitle = document.getElementById('page-title');

    function switchTab(targetId, targetTitle) {
        // Remove active class from all buttons
        tabButtons.forEach(btn => btn.classList.remove('active'));

        // Hide all tab contents
        tabContents.forEach(content => {
            content.classList.remove('active-content');
            content.classList.add('hidden');
        });

        // Add active class to target button based on data-target
        const targetBtn = document.querySelector(`[data-target="${targetId}"]`);
        if (targetBtn) {
            targetBtn.classList.add('active');
        }

        // Show target content
        const targetContent = document.getElementById(targetId);
        if (targetContent) {
            targetContent.classList.remove('hidden');
            targetContent.classList.add('active-content');
        }

        // Update Header Title
        if (pageTitle) {
            pageTitle.textContent = targetTitle;
        }

        // Fix Chart.js rendering issues when container goes from hidden to visible
        if (targetId === 'analytics-tab') {
            setTimeout(() => {
                if (typeof attendanceChart !== 'undefined' && attendanceChart) attendanceChart.resize();
                if (typeof usageChart !== 'undefined' && usageChart) usageChart.resize();
                if (typeof sessionChart !== 'undefined' && sessionChart) sessionChart.resize();
            }, 10);
        }
    }

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-target');
            const targetTitle = button.textContent.trim();
            switchTab(targetId, targetTitle);
        });
    });
});
