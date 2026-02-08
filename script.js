document.addEventListener("DOMContentLoaded", () => {

    const name = localStorage.getItem("userName");

    if(name){
        document.getElementById("userName").innerText = name;
    }
});

// Protect page
if(!localStorage.getItem("loggedIn")){
    window.location.href = "index.html";
}

// Show name
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("userName").innerText =
        localStorage.getItem("userName");
});

function logout(){
    localStorage.clear();
    window.location.href = "index.html";
}

let price = 0;

function selectRoom(type, p){
    document.getElementById("roomType").value = type;
    price = p;
    updateSummary();
}

function updateSummary(){
    const inDate = document.getElementById("checkIn").value;
    const outDate = document.getElementById("checkOut").value;

    if(inDate && outDate){
        const days = (new Date(outDate) - new Date(inDate))/(1000*60*60*24);
        const total = days * price;

        document.getElementById("summaryText").innerHTML =
            `Room: ${roomType.value}<br>Days: ${days}`;
        document.getElementById("totalPrice").innerText = "₹" + total;
    }
}

checkIn.onchange = updateSummary;
checkOut.onchange = updateSummary;

document.getElementById("bookingForm").addEventListener("submit", function(e){
    e.preventDefault();

    document.getElementById("modal").style.display="flex";

    document.getElementById("receipt").innerHTML = `
        Name: ${localStorage.getItem("userName")}<br>
        Room: ${roomType.value}<br>
        Total: ${totalPrice.innerText}
    `;
});

function closeModal(){
    document.getElementById("modal").style.display="none";
}
