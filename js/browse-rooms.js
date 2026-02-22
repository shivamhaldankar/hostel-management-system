/* ===========================
   BROWSE ROOMS JAVASCRIPT
   =========================== */

const API_URL = 'php/';
let allRooms = [];
let allHostels = [];

document.addEventListener('DOMContentLoaded', function() {
    loadHostels();
    loadRooms();
    setupEventListeners();
});

function setupEventListeners() {
    const hostelFilter = document.getElementById('hostelFilter');
    if (hostelFilter) {
        hostelFilter.addEventListener('change', applyFilters);
    }
    
    const roomTypeFilters = document.querySelectorAll('.roomTypeFilter');
    roomTypeFilters.forEach(filter => {
        filter.addEventListener('change', applyFilters);
    });
}

function loadHostels() {
    fetch(API_URL + 'bookings.php?action=get_hostels')
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                allHostels = data.data;
                populateHostelFilter();
            }
        })
        .catch(error => console.error('Error loading hostels:', error));
}

function populateHostelFilter() {
    const select = document.getElementById('hostelFilter');
    
    allHostels.forEach(hostel => {
        const option = document.createElement('option');
        option.value = hostel.id;
        option.textContent = hostel.name;
        select.appendChild(option);
    });
}

function loadRooms() {
    fetch(API_URL + 'bookings.php?action=get_available_rooms')
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                allRooms = data.data;
                renderRooms(allRooms);
            }
        })
        .catch(error => console.error('Error loading rooms:', error));
}

function renderRooms(rooms) {
    const container = document.getElementById('roomsContainer');
    
    if (rooms.length === 0) {
        container.innerHTML = '<div class="empty-state"><div class="empty-state-icon">🔍</div><p>No rooms available matching your criteria</p></div>';
        return;
    }
    
    let html = '';
    
    rooms.forEach(room => {
        const hostel = allHostels.find(h => h.id === room.hostel_id);
        const hostelName = hostel ? hostel.name : 'Unknown Hostel';
        
        html += `
            <div class="room-card" onclick="showRoomModal(${room.id})">
                <div class="room-card-image">
                    🛏️
                    <span class="room-status-badge badge-success">${room.status}</span>
                </div>
                <div class="room-card-content">
                    <div class="room-number">Room ${room.room_number}</div>
                    <div class="room-type">${room.room_type} • ${room.capacity} beds</div>
                    <div class="room-details">
                        <div class="room-detail-item">
                            <label>Available</label>
                            <value>${room.available_beds} bed${room.available_beds !== 1 ? 's' : ''}</value>
                        </div>
                        <div class="room-detail-item">
                            <label>Type</label>
                            <value>${room.room_type}</value>
                        </div>
                    </div>
                    <div class="room-rent">${formatCurrency(room.rent_per_month)}/mo</div>
                    <button class="btn btn-primary" onclick="event.stopPropagation(); showRoomModal(${room.id})">View Details</button>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

function applyFilters() {
    const hostelId = document.getElementById('hostelFilter').value;
    const roomTypes = Array.from(document.querySelectorAll('.roomTypeFilter:checked')).map(el => el.value);
    const minPrice = parseFloat(document.getElementById('minPrice').value) || 0;
    const maxPrice = parseFloat(document.getElementById('maxPrice').value) || Infinity;
    
    let filtered = allRooms;
    
    if (hostelId) {
        filtered = filtered.filter(room => room.hostel_id == hostelId);
    }
    
    if (roomTypes.length > 0) {
        filtered = filtered.filter(room => roomTypes.includes(room.room_type));
    }
    
    filtered = filtered.filter(room => {
        const rent = parseFloat(room.rent_per_month);
        return rent >= minPrice && rent <= maxPrice;
    });
    
    renderRooms(filtered);
}

function resetFilters() {
    document.getElementById('hostelFilter').value = '';
    document.querySelectorAll('.roomTypeFilter').forEach(el => el.checked = false);
    document.getElementById('minPrice').value = '';
    document.getElementById('maxPrice').value = '';
    renderRooms(allRooms);
}

function showRoomModal(roomId) {
    const room = allRooms.find(r => r.id == roomId);
    if (!room) return;
    
    const hostel = allHostels.find(h => h.id === room.hostel_id);
    
    // Set modal data
    document.getElementById('modalRoomNumber').textContent = room.room_number;
    document.getElementById('modalRoomType').textContent = room.room_type.charAt(0).toUpperCase() + room.room_type.slice(1);
    document.getElementById('modalRoomCapacity').textContent = room.capacity + ' beds';
    document.getElementById('modalAvailableBeds').textContent = room.available_beds;
    document.getElementById('modalRoomRent').textContent = formatCurrency(room.rent_per_month);
    document.getElementById('modalRoomStatus').textContent = room.status.charAt(0).toUpperCase() + room.status.slice(1);
    document.getElementById('modalHostelName').textContent = hostel ? hostel.name : 'Unknown';
    document.getElementById('modalHostelAddress').textContent = hostel ? hostel.address + ', ' + hostel.city : 'Unknown';
    document.getElementById('modalRoomTitle').textContent = `Room ${room.room_number}`;
    
    // Set room ID for booking
    document.getElementById('roomModal').dataset.roomId = roomId;
    
    // Set min date to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('checkInDate').min = today;
    document.getElementById('checkInDate').value = '';
    document.getElementById('checkOutDate').value = '';
    
    // Show modal
    document.getElementById('roomModal').classList.add('show');
}

function closeRoomModal() {
    document.getElementById('roomModal').classList.remove('show');
}

function bookRoom() {
    const checkInDate = document.getElementById('checkInDate').value;
    const checkOutDate = document.getElementById('checkOutDate').value;
    const roomId = document.getElementById('roomModal').dataset.roomId;
    
    if (!checkInDate) {
        alert('Please select a check-in date');
        return;
    }
    
    fetch(API_URL + 'bookings.php?action=create_booking', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            room_id: roomId,
            check_in_date: checkInDate,
            check_out_date: checkOutDate
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            alert('Booking created successfully! Booking ID: ' + data.booking_id);
            closeRoomModal();
            loadRooms();
        } else {
            alert('Booking failed: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Booking error:', error);
        alert('An error occurred while booking');
    });
}
