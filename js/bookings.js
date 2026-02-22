/* ===========================
   BOOKINGS PAGE JAVASCRIPT
   =========================== */

const API_URL = 'php/';
let allBookings = [];
let filteredBookings = [];
let currentFilter = 'all';

document.addEventListener('DOMContentLoaded', function() {
    loadBookings();
});

function loadBookings() {
    fetch(API_URL + 'bookings.php?action=get_my_bookings')
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                allBookings = data.data;
                filterBookings('all');
            }
        })
        .catch(error => console.error('Error loading bookings:', error));
}

function filterBookings(status) {
    currentFilter = status;
    
    // Update tab active state
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    if (status === 'all') {
        filteredBookings = allBookings;
    } else {
        filteredBookings = allBookings.filter(booking => booking.status === status);
    }
    
    renderBookings(filteredBookings);
}

function renderBookings(bookings) {
    const container = document.getElementById('bookingsContainer');
    
    if (bookings.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📅</div>
                <p>No bookings found</p>
                <a href="browse-rooms.html" class="btn btn-primary" style="margin-top: 1rem;">Browse Rooms</a>
            </div>
        `;
        return;
    }
    
    let html = '';
    
    bookings.forEach(booking => {
        html += `
            <div class="booking-card" onclick="showBookingModal(${booking.id})">
                <div class="booking-card-header">
                    <div class="booking-info">
                        <h3>Room ${booking.room_number}</h3>
                        <p class="booking-hostel">${booking.hostel_name}</p>
                    </div>
                    <span class="booking-status-badge">${getBookingStatusText(booking.status)}</span>
                </div>
                <div class="booking-card-body">
                    <div class="booking-details">
                        <div class="booking-detail">
                            <div class="booking-detail-label">Room Type</div>
                            <div class="booking-detail-value">${booking.room_type}</div>
                        </div>
                        <div class="booking-detail">
                            <div class="booking-detail-label">Check-in</div>
                            <div class="booking-detail-value">${formatDate(booking.check_in_date)}</div>
                        </div>
                        <div class="booking-detail">
                            <div class="booking-detail-label">Check-out</div>
                            <div class="booking-detail-value">${booking.check_out_date ? formatDate(booking.check_out_date) : 'TBD'}</div>
                        </div>
                        <div class="booking-detail">
                            <div class="booking-detail-label">Total Amount</div>
                            <div class="booking-detail-value">${formatCurrency(booking.total_amount)}</div>
                        </div>
                    </div>
                    <div class="booking-actions">
                        <button class="btn btn-secondary" onclick="event.stopPropagation(); showBookingModal(${booking.id})">View Details</button>
                        ${booking.status === 'pending' ? `<button class="btn btn-danger" onclick="event.stopPropagation(); confirmCancel(${booking.id})">Cancel</button>` : ''}
                    </div>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

function getBookingStatusText(status) {
    const statusMap = {
        'pending': 'Pending',
        'confirmed': 'Confirmed',
        'completed': 'Completed',
        'cancelled': 'Cancelled'
    };
    return statusMap[status] || status;
}

function showBookingModal(bookingId) {
    const booking = allBookings.find(b => b.id == bookingId);
    if (!booking) return;
    
    // Populate modal
    document.getElementById('modalBookingId').textContent = '#' + booking.id;
    document.getElementById('modalBookingHostel').textContent = booking.hostel_name;
    document.getElementById('modalBookingRoom').textContent = 'Room ' + booking.room_number;
    document.getElementById('modalBookingRoomType').textContent = booking.room_type.charAt(0).toUpperCase() + booking.room_type.slice(1);
    document.getElementById('modalCheckInDate').textContent = formatDate(booking.check_in_date);
    document.getElementById('modalCheckOutDate').textContent = booking.check_out_date ? formatDate(booking.check_out_date) : 'Not specified';
    document.getElementById('modalTotalAmount').textContent = formatCurrency(booking.total_amount);
    document.getElementById('modalBookingStatus').innerHTML = getStatusBadge(booking.status);
    
    const paymentStatus = booking.payment_status || 'pending';
    document.getElementById('modalPaymentStatus').innerHTML = getStatusBadge(paymentStatus);
    
    // Store booking ID for actions
    document.getElementById('bookingModal').dataset.bookingId = bookingId;
    
    // Show/hide action buttons based on status
    const confirmBtn = document.querySelector('.modal-actions .btn-primary');
    const cancelBtn = document.querySelector('.modal-actions .btn-danger');
    
    if (booking.status === 'pending') {
        confirmBtn.style.display = 'block';
        cancelBtn.style.display = 'block';
    } else {
        confirmBtn.style.display = 'none';
        cancelBtn.style.display = 'none';
    }
    
    // Show modal
    document.getElementById('bookingModal').classList.add('show');
}

function closeBookingModal() {
    document.getElementById('bookingModal').classList.remove('show');
}

function confirmBooking() {
    const bookingId = document.getElementById('bookingModal').dataset.bookingId;
    // In a real system, this would confirm the booking
    alert('Booking confirmed! (This would be processed in a real system)');
    closeBookingModal();
}

function confirmCancel(bookingId) {
    if (confirm('Are you sure you want to cancel this booking?')) {
        cancelBooking(bookingId);
    }
}

function cancelBooking(bookingId = null) {
    if (!bookingId) {
        bookingId = document.getElementById('bookingModal').dataset.bookingId;
    }
    
    fetch(API_URL + 'bookings.php?action=cancel_booking', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ booking_id: bookingId })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            alert('Booking cancelled successfully');
            closeBookingModal();
            loadBookings();
        } else {
            alert('Cancellation failed: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Cancel error:', error);
        alert('An error occurred while cancelling');
    });
}
