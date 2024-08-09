const flightCardsSection = document.getElementById("flight-cards");
const flightDetailsSection = document.getElementById("flight-details");
const bookingFormSection = document.getElementById("booking-form");

async function create_cards() {
  const response = await fetch("/flights");
  let flightData = await response.json();
  flightData.forEach((flight) => {
    const card = document.createElement("div");
    card.className = "flight-card";
    card.innerHTML = `
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJaXzKmYqEzRGYZanJhxN1vUGtGBI388WMjA&s" alt=" photo of plane">
            <div class="flight-card-info">
                <h3>  ${flight.from} to ${flight.to}</h3>
                <button onclick="show_details('${flight.id}')">View Details</button>
            </div>
        `;
    flightCardsSection.appendChild(card);
  });
}

async function show_details(flightId) {
  console.log(flightId);
  const response = await fetch(`/flights/${flightId}`);
  let flight = await response.json();
  flightDetailsSection.innerHTML = `
        <h2>${flight.from} to ${flight.to}</h2>
        <p>Price: ${flight.price}  SDG </p>
        <p>Class: ${flight.class} </p>
        <p>Available Seats: ${flight.availableSeats}</p>
        <p>Departure Date: ${flight.dateOfDeparture}</p>
        <p>Departure Date: ${flight.dateOfLanding}</p>
        <button onclick="show_form(${flightId})">Book Now</button>
    `;
  flightCardsSection.style.display = "none";
  flightDetailsSection.style.display = "block";
}

function show_form(flightId) {
  flightDetailsSection.style.display = "none";
  bookingFormSection.style.display = "block";
}

create_cards();
