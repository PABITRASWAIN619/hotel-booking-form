// Check login
if (!localStorage.getItem("loggedIn")) {
    window.location.href = "login.html";
}

let pricePerNight = 0;

const roomType = document.getElementById("roomType");
const checkIn = document.getElementById("checkIn");
const checkOut = document.getElementById("checkOut");
const adults = document.getElementById("adults");
const children = document.getElementById("children");
const summaryText = document.getElementById("summaryText");
const totalPriceEl = document.getElementById("totalPrice");
const availability = document.getElementById("availability");
const modal = document.getElementById("modal");
const receipt = document.getElementById("receipt");

const today = new Date().toISOString().split("T")[0];
checkIn.min = today;
checkOut.min = today;

function selectRoom(type, price){
    roomType.value = type;
    pricePerNight = price;
    updateSummary();
}

checkIn.onchange = () => { checkOut.min = checkIn.value; updateSummary(); };
checkOut.onchange = updateSummary;
adults.oninput = updateSummary;
children.oninput = updateSummary;

function daysBetween(d1,d2){
    return (new Date(d2)-new Date(d1))/(1000*60*60*24);
}

function updateSummary(){
    if(checkIn.value && checkOut.value && roomType.value){
        const days = daysBetween(checkIn.value, checkOut.value);

        if(days <= 0){
            availability.innerHTML = "❌ Invalid dates";
            totalPriceEl.innerText = "₹0";
            return;
        }

        availability.innerHTML = "✅ Room Available";
        const total = days * pricePerNight;

        summaryText.innerHTML = `
            Room: ${roomType.value}<br>
            Days: ${days}<br>
            Adults: ${adults.value}, Children: ${children.value}
        `;

        totalPriceEl.innerText = "₹" + total;
    }
}

document.getElementById("bookingForm").onsubmit = function(e){
    e.preventDefault();
    modal.style.display="flex";

    receipt.innerHTML = `
        Room: ${roomType.value}<br>
        Check-in: ${checkIn.value}<br>
        Check-out: ${checkOut.value}<br>
        Total: ${totalPriceEl.innerText}
    `;
};

function closeModal(){
    modal.style.display="none";
}

function downloadReceipt(){
    const blob = new Blob([receipt.innerText], {type:"text/plain"});
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "booking_receipt.txt";
    a.click();
}
function logout(){
    localStorage.removeItem("loggedIn");
    window.location.href = "login.html";
}
