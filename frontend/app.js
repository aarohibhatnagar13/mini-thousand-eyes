/**
 * DATA SET 1: Mock Monitor Status (Phase 3)
 */
const mockMonitors = [
    { id: 1, name: "Main Web Server", target: "google.com", protocol: "HTTP", status: "UP", latency_ms: 45 },
    { id: 2, name: "Payment API", target: "192.168.1.50", protocol: "ICMP", status: "DOWN", latency_ms: null },
    { id: 3, name: "Customer Portal", target: "amazon.com", protocol: "HTTP", status: "UP", latency_ms: 120 },
    { id: 4, name: "Database Cluster", target: "db.internal.net", protocol: "TCP", status: "UP", latency_ms: 5 }
];

/**
 * DATA SET 2: Mock Time-Series Latency (Phase 4)
 */
const mockHistory = [
    { time: "10:00 AM", latency_ms: 45 },
    { time: "10:05 AM", latency_ms: 48 },
    { time: "10:10 AM", latency_ms: 52 },
    { time: "10:15 AM", latency_ms: 300 }, // Spike!
    { time: "10:20 AM", latency_ms: 0 }    // Down!
];

/**
 * PHASE 3: DOM Manipulation
 * This function builds the cards and injects them into your friend's CSS Grid.
 */
function renderMonitorCards() {
    const container = document.getElementById('status-container');
    if (!container) return;

    container.innerHTML = ''; // Clear previous content

    mockMonitors.forEach(monitor => {
        // Match the CSS classes your friend wrote: 'is-up' or 'is-down'
        const stateClass = monitor.status === 'UP' ? 'is-up' : 'is-down';
        const displayLatency = monitor.latency_ms !== null ? monitor.latency_ms : '--';

        // Create the card using your friend's exact HTML structure
        const card = document.createElement('div');
        card.className = `monitor-card ${stateClass}`;
        
        card.innerHTML = `
            <div class="card-header">
                <h3 class="monitor-name">${monitor.name}</h3>
                <span class="protocol-badge">${monitor.protocol}</span>
            </div>
            <div class="card-body">
                <span class="target-url">${monitor.target}</span>
            </div>
            <div class="card-footer">
                <div class="status-indicator">
                    <div class="dot"></div>
                    <span>${monitor.status}</span>
                </div>
                <div class="latency-metric">
                    <span class="value">${displayLatency}</span>
                    <span class="unit">ms</span>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

/**
 * PHASE 4: Data Visualization (Chart.js)
 */
function renderLatencyChart() {
    const ctx = document.getElementById('latency-chart');
    if (!ctx) return;

    // Prepare data from Mock Set 2
    const labels = mockHistory.map(item => item.time);
    const dataPoints = mockHistory.map(item => item.latency_ms);

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Latency (ms)',
                data: dataPoints,
                borderColor: '#3b82f6', // Cisco Blue
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                borderWidth: 2,
                tension: 0.4,
                fill: true,
                pointBackgroundColor: (context) => {
                    const val = context.dataset.data[context.dataIndex];
                    return val === 0 ? '#ef4444' : '#10b981'; // Red if 0, Green if healthy
                }
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: { beginAtZero: true, grid: { color: '#27272a' }, ticks: { color: '#a1a1aa' } },
                x: { grid: { display: false }, ticks: { color: '#a1a1aa' } }
            }
        }
    });
}

// Initialize the Dashboard
function init() {
    console.log("Observability Dashboard Initialized with Mock Data");
    renderMonitorCards();
    renderLatencyChart();
}

// Run when the page loads
document.addEventListener('DOMContentLoaded', init);

function updateSummary() {
    const total = mockMonitors.length;
    const up = mockMonitors.filter(m => m.status === 'UP').length;
    const down = mockMonitors.filter(m => m.status === 'DOWN').length;

    document.getElementById('total-count').textContent = total;
    document.getElementById('up-count').textContent = up;
    document.getElementById('down-count').textContent = down;
}

// Update your init function to include this:
function init() {
    renderMonitorCards();
    renderLatencyChart();
    updateSummary(); // <--- Add this
}