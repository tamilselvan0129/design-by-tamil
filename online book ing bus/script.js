document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const departure = document.getElementById('departure').value;
    const destination = document.getElementById('destination').value;
    const date = document.getElementById('date').value;

    fetch(`/search_buses?departure=${departure}&destination=${destination}&date=${date}`)
        .then(response => response.json())
        .then(data => {
            displayResults(data);
        })
        .catch(error => console.error('Error:', error));
});

function displayResults(data) {
    const resultsSection = document.getElementById('results');
    resultsSection.innerHTML = ''; // Clear previous results

    if (data.length === 0) {
        resultsSection.innerHTML = '<p>No buses found for the selected route and date.</p>';
        return;
    }

    data.forEach(bus => {
        const busElement = document.createElement('div');
        busElement.classList.add('bus');
        busElement.innerHTML = `
            <h3>${bus.bus_name}</h3>
            <p><strong>Departure Time:</strong> ${bus.departure_time}</p>
            <p><strong>Available Seats:</strong> ${bus.available_seats}</p>
            <button onclick="bookTicket(${bus.id})">Book Now</button>
        `;
        resultsSection.appendChild(busElement);
    });
}

function bookTicket(busId) {
    window.location.href = `/book_ticket?busId=${busId}`;
}
