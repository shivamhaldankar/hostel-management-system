-- Create Database
CREATE DATABASE IF NOT EXISTS hostel_management;
USE hostel_management;

-- Users Table (Admin, Staff, Students)
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(15),
    role ENUM('admin', 'staff', 'student') DEFAULT 'student',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Hostels Table
CREATE TABLE hostels (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    address TEXT NOT NULL,
    city VARCHAR(50) NOT NULL,
    capacity INT NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Rooms Table
CREATE TABLE rooms (
    id INT PRIMARY KEY AUTO_INCREMENT,
    hostel_id INT NOT NULL,
    room_number VARCHAR(20) NOT NULL,
    room_type ENUM('single', 'double', 'triple', 'quad') DEFAULT 'double',
    capacity INT NOT NULL,
    available_beds INT NOT NULL,
    rent_per_month DECIMAL(10, 2) NOT NULL,
    status ENUM('available', 'occupied', 'maintenance') DEFAULT 'available',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (hostel_id) REFERENCES hostels(id) ON DELETE CASCADE
);

-- Bookings Table
CREATE TABLE bookings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    room_id INT NOT NULL,
    hostel_id INT NOT NULL,
    check_in_date DATE NOT NULL,
    check_out_date DATE,
    status ENUM('pending', 'confirmed', 'cancelled', 'completed') DEFAULT 'pending',
    total_amount DECIMAL(10, 2),
    payment_status ENUM('pending', 'paid', 'failed') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE,
    FOREIGN KEY (hostel_id) REFERENCES hostels(id) ON DELETE CASCADE
);

-- Payments Table
CREATE TABLE payments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    booking_id INT NOT NULL,
    user_id INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    payment_method VARCHAR(50),
    transaction_id VARCHAR(100),
    status ENUM('pending', 'completed', 'failed') DEFAULT 'pending',
    payment_date TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Complaints Table
CREATE TABLE complaints (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    room_id INT NOT NULL,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    status ENUM('pending', 'in-progress', 'resolved', 'closed') DEFAULT 'pending',
    priority ENUM('low', 'medium', 'high') DEFAULT 'medium',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    resolved_at TIMESTAMP NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE
);

-- Maintenance Table
CREATE TABLE maintenance (
    id INT PRIMARY KEY AUTO_INCREMENT,
    room_id INT NOT NULL,
    hostel_id INT NOT NULL,
    description TEXT NOT NULL,
    maintenance_date DATE NOT NULL,
    completion_date DATE,
    status ENUM('scheduled', 'in-progress', 'completed') DEFAULT 'scheduled',
    cost DECIMAL(10, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE,
    FOREIGN KEY (hostel_id) REFERENCES hostels(id) ON DELETE CASCADE
);

-- Insert Sample Data
INSERT INTO hostels (name, address, city, capacity, description) VALUES 
('Alpha Hostel', '123 Main Street', 'New York', 100, 'Comfortable and affordable hostel near city center'),
('Beta Hostel', '456 Park Avenue', 'Boston', 80, 'Modern hostel with excellent amenities'),
('Gamma Hostel', '789 Oak Lane', 'Chicago', 120, 'Budget-friendly hostel for students');

INSERT INTO users (name, email, password, phone, role) VALUES 
('Admin User', 'admin@hostel.com', MD5('admin123'), '1234567890', 'admin'),
('John Doe', 'john@example.com', MD5('password123'), '9876543210', 'student'),
('Jane Smith', 'jane@example.com', MD5('password123'), '9876543211', 'student');

INSERT INTO rooms (hostel_id, room_number, room_type, capacity, available_beds, rent_per_month, status) VALUES 
(1, '101', 'double', 2, 2, 300.00, 'available'),
(1, '102', 'triple', 3, 3, 400.00, 'available'),
(2, '201', 'single', 1, 1, 250.00, 'available'),
(2, '202', 'quad', 4, 4, 500.00, 'available'),
(3, '301', 'double', 2, 1, 280.00, 'occupied');
