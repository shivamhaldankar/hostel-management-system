# 🏢 Hostel Management System - User Guide

## How to Use the Application

### 1️⃣ First Time Setup

#### Step 1: Install & Configure
```
1. Copy hostel_management folder to your web server
2. Create MySQL database: hostel_management
3. Import database.sql
4. Start Apache and MySQL
```

#### Step 2: Access the Application
```
http://localhost/hostel_management/
```

---

## 2️⃣ Login Page Features

### Create New Account
```
Click "Create Account" button
├─ Enter Full Name
├─ Enter Email
├─ Enter Phone (optional)
├─ Enter Password (min 6 characters)
├─ Confirm Password
└─ Click Register
```

### Login
```
Enter existing credentials:
├─ Email
├─ Password
└─ Click Login
```

### Test Accounts
```
Email: john@example.com
Password: password123
```

---

## 3️⃣ Dashboard Overview

### Navigation Menu
```
┌─────────────────────────────────────┐
│  🏢 Hostel Management              │
│─────────────────────────────────────│
│  Dashboard  | Browse  | Bookings    │
│  Profile    | Logout                │
└─────────────────────────────────────┘
```

### Dashboard Widgets
```
┌────────────┬────────────┬────────────┐
│ Hostels    │  Rooms     │ Bookings   │
│     3      │     4      │     1      │
└────────────┴────────────┴────────────┘

┌─────────────────────────────────────┐
│  Recent Bookings                    │
│  ┌──────────────────────────────┐   │
│  │ Room 101 - Alpha Hostel      │   │
│  │ Check-in: Feb 20, 2026       │   │
│  │ Status: Pending              │   │
│  └──────────────────────────────┘   │
└─────────────────────────────────────┘
```

---

## 4️⃣ Browse Rooms

### Filter Options
```
Filters
├─ Hostel: [Dropdown]
├─ Room Type:
│  ├─ □ Single
│  ├─ □ Double
│  ├─ □ Triple
│  └─ □ Quad
├─ Price Range:
│  ├─ Min: [Input]
│  └─ Max: [Input]
└─ [Apply Filters] [Reset]
```

### Room Cards Display
```
┌──────────────────────┐
│      🛏️ Room 101     │
│  Double • 2 beds     │
│  ─────────────────   │
│  Available: 2 beds   │
│  Type: Double        │
│  ─────────────────   │
│  $300.00/month       │
│  ─────────────────   │
│ [View Details]       │
└──────────────────────┘
```

### Booking a Room
```
1. Click on room card
2. Select check-in date
3. Select check-out date (optional)
4. Click "Book Now"
5. Confirmation message appears
```

---

## 5️⃣ My Bookings

### Filter by Status
```
Tabs:
├─ All
├─ Pending
├─ Confirmed
├─ Completed
└─ Cancelled
```

### Booking Card Details
```
┌─────────────────────────────────────┐
│  Room 101  [Pending]                │
│  Alpha Hostel                       │
│───────────────────────────────────── │
│  Room Type: Double                  │
│  Check-in: Feb 20, 2026             │
│  Check-out: TBD                     │
│  Total: $300.00                     │
│───────────────────────────────────── │
│  [View Details]  [Cancel]           │
└─────────────────────────────────────┘
```

### Actions Available
```
For Pending Bookings:
├─ [View Details] - See full booking info
└─ [Cancel] - Cancel the booking

For Confirmed/Other:
└─ [View Details] - View booking info
```

---

## 6️⃣ Profile Page

### Personal Information
```
Profile Section:
├─ Full Name: John Doe
├─ Email: john@example.com
├─ Role: Student
└─ [Update Profile]
```

### Update Profile
```
┌─────────────────────┐
│ Edit Profile        │
├─────────────────────┤
│ Full Name: [Input]  │
│ Email: [Disabled]   │
│ Phone: [Input]      │
│ [Update Profile]    │
└─────────────────────┘
```

### Change Password
```
┌────────────────────────────────┐
│ Change Password                │
├────────────────────────────────┤
│ Current Password: [Input]      │
│ New Password: [Input]          │
│ Confirm Password: [Input]      │
│ [Change Password]              │
└────────────────────────────────┘
```

---

## 7️⃣ Common Tasks

### Task: Book a Room

```
1. Click "Browse Rooms"
2. Use filters to find your preferred room
3. Click on a room card
4. Fill in booking details:
   - Check-in date: Pick date from calendar
   - Check-out date: Optional
5. Click "Book Now"
6. Confirmation message shows booking ID
7. View booking in "My Bookings"
```

### Task: Cancel a Booking

```
1. Go to "My Bookings"
2. Find the pending booking
3. Click [Cancel] button
4. Confirm cancellation
5. Booking status changes to "Cancelled"
```

### Task: Update Your Profile

```
1. Click "Profile" in navigation
2. Scroll to "Edit Profile"
3. Update Full Name and Phone
4. Click "Update Profile"
5. Success message appears
```

### Task: Change Password

```
1. Click "Profile" in navigation
2. Scroll to "Change Password"
3. Enter current password
4. Enter new password (min 6 characters)
5. Confirm new password
6. Click "Change Password"
7. Success message appears
```

---

## 8️⃣ Features Explained

### Dashboard Statistics
```
Total Hostels: Number of hostels in the system
Available Rooms: Number of rooms you can book
My Bookings: Total bookings you've made
Total Spent: Sum of all booking amounts
```

### Room Information
```
Room Number: Unique identifier (e.g., 101)
Room Type: Single/Double/Triple/Quad
Capacity: Total beds in the room
Available Beds: Free beds to book
Monthly Rent: Price per month
Status: Available/Occupied/Maintenance
```

### Booking Status
```
Pending: Awaiting confirmation
Confirmed: Booking is confirmed
Completed: Booking period ended
Cancelled: Booking was cancelled
```

### Payment Status
```
Pending: Payment not yet made
Paid: Payment received
Failed: Payment failed
```

---

## 9️⃣ Tips & Tricks

### ✨ Tips for Better Experience
1. **Responsive Design**: Works on mobile - try rotating your phone
2. **Filtering**: Use multiple filters to narrow down results
3. **Date Selection**: Checkout date is optional (auto-calculated)
4. **Hover Effects**: Hover over cards to see animations
5. **Mobile Menu**: On mobile, use the ☰ menu button
6. **Keyboard**: Press Tab to navigate forms quickly
7. **Status Badges**: Colors indicate booking status
8. **Quick Stats**: Dashboard shows everything at a glance

### ⚡ Keyboard Shortcuts
```
F12: Open Developer Tools (for debugging)
Ctrl+Shift+R: Hard refresh page (clear cache)
Tab: Navigate through form fields
Enter: Submit forms
Escape: Close modals
```

---

## 🔟 Troubleshooting

### Can't Login
```
Solutions:
1. Check email spelling
2. Verify password (case-sensitive)
3. Ensure database is running
4. Clear browser cookies
5. Try a different browser
```

### Rooms Not Showing
```
Solutions:
1. Refresh the page
2. Check internet connection
3. Wait a few seconds for loading
4. Clear browser cache
5. Check browser console (F12) for errors
```

### Booking Won't Submit
```
Solutions:
1. Select a check-in date
2. Use a future date
3. Ensure form fields are filled
4. Check if room is still available
5. Try refreshing page
```

### Styling Looks Broken
```
Solutions:
1. Clear browser cache (Ctrl+Shift+Delete)
2. Hard refresh (Ctrl+Shift+R)
3. Check if CSS files loaded (F12 → Network)
4. Try different browser
5. Disable browser extensions
```

---

## 🎓 Learning Resources

### File Organization
```
Read these files to understand:
├─ README.md - Full documentation
├─ QUICK_START.md - Setup guide
├─ PROJECT_SUMMARY.md - Project overview
└─ php/*.php - Backend logic
```

### Browser Developer Tools (F12)
```
Console Tab: See JavaScript errors and logs
Network Tab: Monitor API calls
Elements Tab: Inspect HTML and CSS
```

### Testing
```
1. Try all filter combinations
2. Test on different browsers
3. Test on mobile device
4. Try different user accounts
5. Check all page transitions
```

---

## 📊 System Architecture Overview

```
┌─────────────────────────────────────┐
│    User Interface (HTML/CSS/JS)     │
├─────────────────────────────────────┤
│     API Communication (AJAX)        │
├─────────────────────────────────────┤
│    Backend API (PHP Endpoints)      │
├─────────────────────────────────────┤
│    Database Layer (MySQL)           │
│  ┌──────────────────────────────┐   │
│  │ Users | Hostels | Rooms      │   │
│  │ Bookings | Payments | etc.   │   │
│  └──────────────────────────────┘   │
└─────────────────────────────────────┘
```

---

## ✅ Checklist Before Going Live

- [ ] Database created and populated
- [ ] All files in correct folders
- [ ] Server is running (Apache & MySQL)
- [ ] Can access application URL
- [ ] Can login with test account
- [ ] Can browse and filter rooms
- [ ] Can create bookings
- [ ] Can view bookings
- [ ] Can update profile
- [ ] Responsive on mobile
- [ ] No errors in console (F12)

---

## 🚀 Ready to Start?

1. **First Time**: Start with the login page
2. **Create Account**: Register if you don't have one
3. **Explore**: Try browsing rooms
4. **Book**: Make your first booking
5. **Manage**: View and manage your bookings
6. **Customize**: Update your profile

**Enjoy using the Hostel Management System!** 🎉

---

**Need Help?** Check README.md or QUICK_START.md for more information.

**Version**: 1.0.0 | **Status**: ✅ Production Ready
