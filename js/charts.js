/**
 * LeapX Member Dashboard - Chart.js Advanced Integration
 */

// Custom data configuration for Timeframe swapping (Personal member metrics)
const dataConfig = {
    weekly: {
        labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
        attendance: [60, 45, 90, 0, 75, 120, 0],
        capacity: '82%', 
        avgTime: '1h 15m', 
        calories: '8,500', 
        retention: '94%',
        usage: [30, 25, 20, 15, 10], 
        sessions: [0, 1, 3, 1, 0, 0],
        prog: [85, 50, 75], 
        progLabels: ['8.5k / 10k', '0.5 / 1.0', '45 / 60']
    },
    monthly: {
        labels: ['W1', 'W2', 'W3', 'W4'],
        attendance: [260, 310, 290, 340],
        capacity: '78%', 
        avgTime: '1h 10m', 
        calories: '36,200', 
        retention: '92%',
        usage: [40, 20, 15, 15, 10], 
        sessions: [1, 4, 11, 3, 1, 0],
        prog: [90, 65, 91], 
        progLabels: ['36k / 40k', '2.1 / 3.0', '55 / 60']
    },
    yearly: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        attendance: [1200, 1100, 1300, 1400, 1250, 1500, 1350, 1600, 1450, 1550, 1380, 1650],
        capacity: '65%', 
        avgTime: '1h 20m', 
        calories: '420,000', 
        retention: '89%',
        usage: [45, 25, 10, 10, 10], 
        sessions: [12, 48, 130, 40, 8, 2],
        prog: [84, 75, 83], 
        progLabels: ['420k / 500k', '15.0 / 20.0', '50 / 60']
    }
};

let attendanceChart = null;
let usageChart = null;
let sessionChart = null;

function getThemeColors() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const savedTheme = localStorage.getItem('theme') || 'dark';
    const isLight = (currentTheme === 'light' || (!currentTheme && savedTheme === 'light'));
    return {
        labelColor: '#8a8a8a', // Solid mid-grey visible on both light and dark themes
        gridColor: isLight ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.08)',
        barColor: isLight ? 'rgba(17, 24, 39, 0.70)' : 'rgba(212, 175, 55, 0.70)',
        doughnutBg: isLight ? ['#d4af37', '#cbd5e1', '#8a6a3a', '#d96300', '#111827'] : ['#d4af37', '#e8ddcb', '#8a6a3a', '#d96300', '#eaeaea']
    };
}

function applyChartTheme() {
    const colors = getThemeColors();
    
    // Update global defaults
    Chart.defaults.color = colors.labelColor;

    // Update attendance line chart
    if (attendanceChart) {
        attendanceChart.options.scales.x.ticks = attendanceChart.options.scales.x.ticks || {};
        attendanceChart.options.scales.y.ticks = attendanceChart.options.scales.y.ticks || {};
        attendanceChart.options.scales.x.ticks.color = colors.labelColor;
        attendanceChart.options.scales.y.ticks.color = colors.labelColor;
        attendanceChart.options.scales.y.grid.color = colors.gridColor;
        attendanceChart.update();
    }

    // Update usage doughnut chart
    if (usageChart) {
        usageChart.data.datasets[0].backgroundColor = colors.doughnutBg;
        usageChart.update();
    }

    // Update session bar chart
    if (sessionChart) {
        sessionChart.data.datasets[0].backgroundColor = colors.barColor;
        sessionChart.options.scales.x.ticks = sessionChart.options.scales.x.ticks || {};
        sessionChart.options.scales.x.ticks.color = colors.labelColor;
        sessionChart.update();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initCharts();
    
    // Set initial values from 'yearly' to start
    updateUIElements('yearly');
    
    // Apply appropriate theme colors immediately
    applyChartTheme();

    // Theme syncing is handled globally by js/theme.js which calls applyChartTheme()
});

function initCharts() {
    const colors = getThemeColors();

    // Determine font family
    Chart.defaults.font.family = "'Inter', sans-serif";
    Chart.defaults.color = colors.labelColor;

    // 1. Attendance Line Chart
    const attCtx = document.getElementById('attendanceChart');
    if (attCtx) {
        const ctx = attCtx.getContext('2d');
        const grad = ctx.createLinearGradient(0, 0, 0, 300);
        
        // Beautiful transparent golden flow gradient
        grad.addColorStop(0, 'rgba(212, 175, 55, 0.35)'); 
        grad.addColorStop(1, 'rgba(212, 175, 55, 0)');    

        attendanceChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: dataConfig.yearly.labels,
                datasets: [{
                    data: dataConfig.yearly.attendance,
                    borderColor: '#d4af37',
                    borderWidth: 3,
                    tension: 0.4,
                    fill: true,
                    backgroundColor: grad,
                    pointRadius: 2,
                    pointHoverRadius: 6,
                    pointHoverBackgroundColor: '#ffffff',
                    pointHoverBorderColor: '#d4af37',
                    pointHoverBorderWidth: 3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { 
                    legend: { display: false }
                },
                scales: {
                    y: { 
                        border: { display: false }, 
                        grid: { color: colors.gridColor },
                        ticks: { color: colors.labelColor }
                    },
                    x: { 
                        border: { display: false }, 
                        grid: { display: false },
                        ticks: { color: colors.labelColor }
                    }
                }
            }
        });
    }

    // 2. Exercise Breakdown Doughnut
    const usageCtx = document.getElementById('analyticsUsageChart');
    if (usageCtx) {
        usageChart = new Chart(usageCtx, {
            type: 'doughnut',
            data: {
                labels: ['Weights', 'Cardio', 'Yoga', 'Pool', 'Classes'],
                datasets: [{
                    data: dataConfig.yearly.usage,
                    backgroundColor: colors.doughnutBg,
                    borderWidth: 0,
                    hoverOffset: 12
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '70%',
                plugins: { 
                    legend: { display: false } 
                }
            }
        });
    }

    // 3. Session Distribution Bar Chart
    const sessionCtx = document.getElementById('sessionChart');
    if (sessionCtx) {
        sessionChart = new Chart(sessionCtx, {
            type: 'bar',
            data: {
                labels: ['0-30', '30-60', '60-90', '90-120', '120-150', '150+'],
                datasets: [{
                    data: dataConfig.yearly.sessions,
                    backgroundColor: colors.barColor,
                    hoverBackgroundColor: '#d4af37',
                    borderRadius: 8,
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { 
                    legend: { display: false } 
                },
                scales: {
                    y: { display: false },
                    x: { 
                        border: { display: false }, 
                        grid: { display: false },
                        ticks: { color: colors.labelColor }
                    }
                }
            }
        });
    }
}

// Global timeframe changer
window.changeTimeframe = function(period, btn) {
    // Switch active states on buttons
    document.querySelectorAll('.filter-btn').forEach(b => {
        b.classList.remove('nav-item-active', 'active');
        b.classList.add('text-zinc-500');
    });
    btn.classList.add('nav-item-active', 'active');
    btn.classList.remove('text-zinc-500');

    const data = dataConfig[period];
    if (!data) return;

    // Smoothly animate and update attendance line chart
    if (attendanceChart) {
        attendanceChart.data.labels = data.labels;
        attendanceChart.data.datasets[0].data = data.attendance;
        attendanceChart.update();
    }

    // Smoothly update Doughnut breakdown
    if (usageChart) {
        usageChart.data.datasets[0].data = data.usage;
        usageChart.update();
    }

    // Smoothly update Bar distribution
    if (sessionChart) {
        sessionChart.data.datasets[0].data = data.sessions;
        sessionChart.update();
    }

    // Update UI elements
    updateUIElements(period);
};

function updateUIElements(period) {
    const data = dataConfig[period];
    if (!data) return;

    // Update stats widgets
    const capacityVal = document.getElementById('capacity-val');
    const statAvgTime = document.getElementById('stat-avg-time');
    const statCalories = document.getElementById('stat-calories');
    const statRetention = document.getElementById('stat-retention');

    if (capacityVal) {
        if (typeof memberData !== 'undefined' && memberData && memberData.goalProgress) {
            capacityVal.innerText = memberData.goalProgress;
        } else {
            capacityVal.innerText = data.capacity;
        }
    }
    if (statAvgTime) statAvgTime.innerText = data.avgTime;
    if (statCalories) statCalories.innerText = data.calories;
    if (statRetention) statRetention.innerText = data.retention;

    // Update Milestones progress indicators
    const barCal = document.getElementById('bar-cal');
    const barWeight = document.getElementById('bar-weight');
    const barTime = document.getElementById('bar-time');

    const labelCal = document.getElementById('label-cal');
    const labelWeight = document.getElementById('label-weight');
    const labelTime = document.getElementById('label-time');

    if (barCal) barCal.style.width = data.prog[0] + '%';
    if (barWeight) barWeight.style.width = data.prog[1] + '%';
    if (barTime) barTime.style.width = data.prog[2] + '%';

    if (labelCal) labelCal.innerText = data.progLabels[0];
    if (labelWeight) labelWeight.innerText = data.progLabels[1];
    if (labelTime) labelTime.innerText = data.progLabels[2];
}
