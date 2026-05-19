// Array of mock users representing a mock database
var defaultMockUsers = [
    {
        name: "John Doe",
        email: "john@fitindia.com",
        plan: "Elite",
        planType: "Pro Member",
        expiryDate: "Aug 15, 2026",
        totalSessions: 143,
        usedSessions: 0,
        remainingSessions: 143,
        fitPoints: 3887,
        goalProgress: "85%",
        age: "32 yrs",
        height: "182 cm",
        weight: "85 kg",
        goal: "Strength Building",
        memberId: "EF-0002",
        retention: "95%"
    },
    {
        name: "Jane Smith",
        email: "jane@fitindia.com",
        plan: "Basic",
        planType: "Standard Member",
        expiryDate: "August 15, 2026",
        totalSessions: 50,
        usedSessions: 10,
        remainingSessions: 40,
        fitPoints: 1200,
        goalProgress: "65%",
        age: "28 yrs",
        height: "178 cm",
        weight: "82 kg",
        goal: "Muscle Gain",
        memberId: "EF-0001",
        retention: "92%"
    },
    {
        name: "User 134",
        email: "user134@fitindia.com",
        plan: "Premium",
        planType: "VIP Member",
        expiryDate: "Nov 01, 2025",
        totalSessions: 200,
        usedSessions: 50,
        remainingSessions: 150,
        fitPoints: 5000,
        goalProgress: "92%",
        age: "25 yrs",
        height: "170 cm",
        weight: "68 kg",
        goal: "Cardio Burn",
        memberId: "EF-0003",
        retention: "88%"
    }
];

// Load from localStorage if present to persist new signups
var storedUsers = localStorage.getItem('leapx_mockUsers');
var mockUsers = storedUsers ? JSON.parse(storedUsers) : defaultMockUsers;

// This will store the active user's data after they log in
var memberData = null;

function getExpiryDate() {
    return memberData ? memberData.expiryDate : "";
}

function displayExpiryDate() {
    var el = document.getElementById("expiry-val")
    if (el) el.textContent = getExpiryDate()
}

function getExistingPlan() {
    return memberData ? memberData.plan : "";
}

function displayExistingPlan() {
    var el = document.getElementById("active-plan-val")
    if (el) el.textContent = getExistingPlan()
}

function getPlanType() {
    return memberData ? memberData.planType : "";
}

function displayPlanType() {
    var el = document.getElementById("plan-type-val")
    if (el) el.textContent = getPlanType()
}
