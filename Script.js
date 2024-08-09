const flightData =[
  {
    "id": 1,
    "from": "Khartoum",
    "to": "Cairo",
    "price": 450000,
    "dateOfDeparture": "2024-04-02T11:30:00",
    "dateOfLanding": "2024-04-02T13:30:00",
    "availableSeats": 22
  },
  {
    "id": 2,
    "from": "Cairo",
    "to": "Khartoum",
    "price": 480000,
    "dateOfDeparture": "2024-04-03T10:15:00",
    "dateOfLanding": "2024-04-03T12:15:00",
    "availableSeats": 39
  },
  {
    "id": 3,
    "from": "Khartoum",
    "to": "Dubai",
    "price": 550000,
    "dateOfDeparture": "2024-04-02T10:45:00",
    "dateOfLanding": "2024-04-02T13:45:00",
    "availableSeats": 17
  },
  {
    "id": 4,
    "from": "Dubai",
    "to": "Khartoum",
    "price": 600000,
    "dateOfDeparture": "2024-04-03T09:00:00",
    "dateOfLanding": "2024-04-03T11:00:00",
    "availableSeats": 31
  },
  {
    "id": 5,
    "from": "Khartoum",
    "to": "Riyadh",
    "price": 650000,
    "dateOfDeparture": "2024-04-02T12:00:00",
    "dateOfLanding": "2024-04-02T14:00:00",
    "availableSeats": 11
  },
  {
    "id": 6,
    "from": "Riyadh",
    "to": "Khartoum",
    "price": 700000,
    "dateOfDeparture": "2024-04-03T09:30:00",
    "dateOfLanding": "2024-04-03T11:30:00",
    "availableSeats": 26
  }
];

const flightCardsSection = document.getElementById('flight-cards');
const flightDetailsSection = document.getElementById('flight-details');
const bookingFormSection = document.getElementById('booking-form');

function create_cards() {
    flightData.forEach(flight => {
        const card = document.createElement('div');
        card.className = 'flight-card';
        card.innerHTML = `
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJaXzKmYqEzRGYZanJhxN1vUGtGBI388WMjA&s" alt=" photo of plane">
            <div class="flight-card-info">
            
                <h3>  ${flight.from} to ${flight.to}</h3>
                <button onclick="show_details(${flight.id})">View Details</button>
            </div>
        `;
        
        flightCardsSection.appendChild(card);
    });
}

function show_details(flightId) {
    const flight = flightData.find(f => f.id === flightId);
    flightDetailsSection.innerHTML = `
        <h2>${flight.from} to ${flight.to}</h2>
        <p>Price: ${flight.price}  SDG </p>
        <p>Available Seats: ${flight.availableSeats}</p>
        <p>Departure Date: ${flight.dateOfDeparture}</p>
        <button onclick="show_form(${flightId})">Book Now</button>
    `;
    flightCardsSection.style.display = 'none';
    flightDetailsSection.style.display = 'block';
}

function show_form(flightId) {
    flightDetailsSection.style.display = 'none';
    bookingFormSection.style.display = 'block';
}


create_cards();
