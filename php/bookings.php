<?php
include 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $action = $_GET['action'] ?? '';
    
    if ($action === 'get_hostels') {
        get_hostels();
    } elseif ($action === 'get_rooms') {
        get_rooms();
    } elseif ($action === 'get_available_rooms') {
        get_available_rooms();
    } elseif ($action === 'get_room_details') {
        get_room_details();
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_GET['action'] ?? '';
    
    if ($action === 'create_booking') {
        create_booking();
    } elseif ($action === 'get_my_bookings') {
        get_my_bookings();
    } elseif ($action === 'cancel_booking') {
        cancel_booking();
    }
}

function get_hostels() {
    global $conn;
    $sql = "SELECT * FROM hostels";
    $result = $conn->query($sql);
    
    $hostels = [];
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $hostels[] = $row;
        }
    }
    
    echo json_encode(['status' => 'success', 'data' => $hostels]);
}

function get_rooms() {
    global $conn;
    
    $hostel_id = $_GET['hostel_id'] ?? 0;
    
    if ($hostel_id) {
        $sql = "SELECT * FROM rooms WHERE hostel_id = $hostel_id";
    } else {
        $sql = "SELECT * FROM rooms";
    }
    
    $result = $conn->query($sql);
    $rooms = [];
    
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $rooms[] = $row;
        }
    }
    
    echo json_encode(['status' => 'success', 'data' => $rooms]);
}

function get_available_rooms() {
    global $conn;
    
    $hostel_id = $_GET['hostel_id'] ?? 0;
    
    if ($hostel_id) {
        $sql = "SELECT * FROM rooms WHERE hostel_id = $hostel_id";
    } else {
        $sql = "SELECT * FROM rooms";
    }
    
    $result = $conn->query($sql);
    $rooms = [];
    
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $rooms[] = $row;
        }
    }
    
    echo json_encode(['status' => 'success', 'data' => $rooms]);
}

function get_room_details() {
    global $conn;
    
    $room_id = $_GET['room_id'] ?? 0;
    
    if (!$room_id) {
        echo json_encode(['status' => 'error', 'message' => 'Room ID required']);
        return;
    }
    
    $sql = "SELECT r.*, h.name as hostel_name, h.address, h.city FROM rooms r 
            JOIN hostels h ON r.hostel_id = h.id 
            WHERE r.id = $room_id";
    
    $result = $conn->query($sql);
    
    if ($result->num_rows === 1) {
        $room = $result->fetch_assoc();
        echo json_encode(['status' => 'success', 'data' => $room]);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Room not found']);
    }
}

function create_booking() {
    global $conn;
    
    if (!isset($_SESSION['user_id'])) {
        echo json_encode(['status' => 'error', 'message' => 'Please login first']);
        return;
    }
    
    $data = json_decode(file_get_contents("php://input"), true);
    
    if (!isset($data['room_id']) || !isset($data['check_in_date'])) {
        echo json_encode(['status' => 'error', 'message' => 'Missing required fields']);
        return;
    }
    
    $user_id = $_SESSION['user_id'];
    $room_id = (int)$data['room_id'];
    $check_in_date = $conn->real_escape_string($data['check_in_date']);
    $check_out_date = $conn->real_escape_string($data['check_out_date'] ?? '');
    
    // Get room and hostel details
    $room_sql = "SELECT * FROM rooms WHERE id = $room_id";
    $room_result = $conn->query($room_sql);
    
    if ($room_result->num_rows === 0) {
        echo json_encode(['status' => 'error', 'message' => 'Room not found']);
        return;
    }
    
    $room = $room_result->fetch_assoc();
    $hostel_id = $room['hostel_id'];
    $rent = $room['rent_per_month'];
    
    // Calculate total amount (assuming 1 month)
    $total_amount = $rent;
    
    $sql = "INSERT INTO bookings (user_id, room_id, hostel_id, check_in_date, check_out_date, total_amount, status) 
            VALUES ($user_id, $room_id, $hostel_id, '$check_in_date', '$check_out_date', $total_amount, 'pending')";
    
    if ($conn->query($sql)) {
        $booking_id = $conn->insert_id;
        
        // Update room status
        $update_sql = "UPDATE rooms SET status = 'occupied', available_beds = available_beds - 1 WHERE id = $room_id";
        $conn->query($update_sql);
        
        echo json_encode(['status' => 'success', 'message' => 'Booking created successfully', 'booking_id' => $booking_id]);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Booking failed: ' . $conn->error]);
    }
}

function get_my_bookings() {
    global $conn;
    
    if (!isset($_SESSION['user_id'])) {
        echo json_encode(['status' => 'error', 'message' => 'Please login first']);
        return;
    }
    
    $user_id = $_SESSION['user_id'];
    
    $sql = "SELECT b.*, r.room_number, r.room_type, h.name as hostel_name 
            FROM bookings b 
            JOIN rooms r ON b.room_id = r.id 
            JOIN hostels h ON b.hostel_id = h.id 
            WHERE b.user_id = $user_id 
            ORDER BY b.created_at DESC";
    
    $result = $conn->query($sql);
    $bookings = [];
    
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $bookings[] = $row;
        }
    }
    
    echo json_encode(['status' => 'success', 'data' => $bookings]);
}

function cancel_booking() {
    global $conn;
    
    if (!isset($_SESSION['user_id'])) {
        echo json_encode(['status' => 'error', 'message' => 'Please login first']);
        return;
    }
    
    $data = json_decode(file_get_contents("php://input"), true);
    
    if (!isset($data['booking_id'])) {
        echo json_encode(['status' => 'error', 'message' => 'Booking ID required']);
        return;
    }
    
    $booking_id = (int)$data['booking_id'];
    $user_id = $_SESSION['user_id'];
    
    // Check if booking belongs to user
    $check = $conn->query("SELECT * FROM bookings WHERE id = $booking_id AND user_id = $user_id");
    
    if ($check->num_rows === 0) {
        echo json_encode(['status' => 'error', 'message' => 'Booking not found']);
        return;
    }
    
    $sql = "UPDATE bookings SET status = 'cancelled' WHERE id = $booking_id";
    
    if ($conn->query($sql)) {
        echo json_encode(['status' => 'success', 'message' => 'Booking cancelled successfully']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Cancellation failed']);
    }
}
?>
