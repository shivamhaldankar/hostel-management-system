/* ===========================
   DASHBOARD JAVASCRIPT
   =========================== */

const API_URL = 'php/';

document.addEventListener('DOMContentLoaded', function() {
    loadDashboardStats();
    loadRecentBookings();
});

function loadDashboardStats() {
    // Load total hostels
    fetch(API_URL + 'bookings.php?action=get_hostels')
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                document.getElementById('totalHostels').textContent = data.data.length;
            }
        })
        .catch(error => console.error('Error loading hostels:', error));
    
    // Load available rooms
    fetch(API_URL + 'bookings.php?action=get_available_rooms')
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                document.getElementById('availableRooms').textContent = data.data.length;
            }
        })
        .catch(error => console.error('Error loading rooms:', error));
    
    // Load user's bookings
    fetch(API_URL + 'bookings.php?action=get_my_bookings')
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                const bookings = data.data;
                document.getElementById('myBookings').textContent = bookings.length;
                
                // Calculate total spent
                const totalSpent = bookings.reduce((sum, booking) => {
                    return sum + (parseFloat(booking.total_amount) || 0);
                }, 0);
                
                document.getElementById('totalSpent').textContent = formatCurrency(totalSpent);
            }
        })
        .catch(error => console.error('Error loading bookings:', error));
}

function loadRecentBookings() {
    fetch(API_URL + 'bookings.php?action=get_my_bookings')
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                const bookings = data.data.slice(0, 3); // Get first 3 bookings
                renderRecentBookings(bookings);
            }
        })
        .catch(error => console.error('Error loading recent bookings:', error));
}

function renderRecentBookings(bookings) {
    const container = document.getElementById('recentBookingsContainer');
    
    if (bookings.length === 0) {
        container.innerHTML = '<p class="empty-state">No bookings yet. <a href="browse-rooms.html">Browse rooms</a></p>';
        return;
    }
    
    let html = `
        <table class="bookings-table">
            <thead>
                <tr>
                    <th>Room</th>
                    <th>Hostel</th>
                    <th>Check-in</th>
                    <th>Status</th>
                    <th>Amount</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    bookings.forEach(booking => {
        html += `
            <tr onclick="window.location.href='my-bookings.html'">
                <td data-label="Room">${booking.room_number} (${booking.room_type})</td>
                <td data-label="Hostel">${booking.hostel_name}</td>
                <td data-label="Check-in">${formatDate(booking.check_in_date)}</td>
                <td data-label="Status">${getStatusBadge(booking.status)}</td>
                <td data-label="Amount">${formatCurrency(booking.total_amount)}</td>
            </tr>
        `;
    });
    
    html += `
            </tbody>
        </table>
    `;
    
    container.innerHTML = html;
}
