// ================= ALERT FUNCTION =================
function showAlert(message, type) {
    const alertBox = document.getElementById("pageAlert");
    alertBox.innerText = message;
    alertBox.className = `page-alert ${type}`;
    alertBox.classList.remove("hidden");

    setTimeout(() => {
        alertBox.classList.add("hidden");
    }, 3000);
}

// ================= PAGE PROTECT =================
if (!localStorage.getItem("loggedIn")) {
    window.location.href = "index.html";
}

// ================= SET TODAY AS MIN CHECKIN =================
const today = new Date().toISOString().split("T")[0];
document.getElementById("checkIn").setAttribute("min", today);

// ================= FETCH USER FROM SERVER =================
document.addEventListener("DOMContentLoaded", async () => {
    try {
        const res = await fetch("http://localhost:5000/api/user");
        const data = await res.json();
        document.getElementById("userName").innerText = data.name;
    } catch {
        document.getElementById("userName").innerText = "Guest";
    }
});

// ================= VARIABLES =================
let pricePerDay = 0;

const roomType = document.getElementById("roomType");
const checkIn = document.getElementById("checkIn");
const checkOut = document.getElementById("checkOut");
const adults = document.getElementById("adults");
const children = document.getElementById("children");
const totalPriceEl = document.getElementById("totalPrice");
const summaryText = document.getElementById("summaryText");

// ================= ROOM SELECT =================
function selectRoom(type, price) {
    roomType.value = type;
    pricePerDay = price;
    updateSummary();
}

// ================= DATE RULES =================
checkIn.addEventListener("change", () => {
    checkOut.min = checkIn.value;
    updateSummary();
});

checkOut.addEventListener("change", updateSummary);
adults.addEventListener("input", updateSummary);
children.addEventListener("input", updateSummary);

// ================= SUMMARY =================
function updateSummary() {
    const inDate = new Date(checkIn.value);
    const outDate = new Date(checkOut.value);

    if (!roomType.value) return;

    if (checkIn.value && checkOut.value) {
        const days = (outDate - inDate) / (1000 * 60 * 60 * 24);

        if (days <= 0) {
            summaryText.innerHTML = "Invalid dates selected";
            totalPriceEl.innerText = "₹0";
            return;
        }

        const totalGuests = Number(adults.value) + Number(children.value);

        if (adults.value < 1) {
            summaryText.innerHTML = "At least 1 adult required";
            totalPriceEl.innerText = "₹0";
            return;
        }

        if (totalGuests > 10) {
            summaryText.innerHTML = "Maximum 10 guests allowed";
            totalPriceEl.innerText = "₹0";
            return;
        }

        const total = days * pricePerDay;

        summaryText.innerHTML = `
            Room: ${roomType.value}<br>
            Days: ${days}<br>
            Guests: ${totalGuests}
        `;

        totalPriceEl.innerText = "₹" + total;
    }
}

// ================= FORM SUBMIT =================
document.getElementById("bookingForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const total = totalPriceEl.innerText.replace("₹", "");

    if (total == 0 || !roomType.value) {
        showAlert("❌ Error: Please select valid room, dates and guests", "error");
        return;
    }

    showAlert("✅ Booking Successful!", "success");

    document.getElementById("modal").style.display = "flex";

    document.getElementById("receipt").innerHTML = `
        Name: ${document.getElementById("userName").innerText}<br>
        Room: ${roomType.value}<br>
        Total: ₹${total}
    `;
});

// ================= LOGOUT =================
function logout() {
    localStorage.clear();
    window.location.href = "index.html";
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}
