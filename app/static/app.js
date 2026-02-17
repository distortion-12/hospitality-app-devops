const API_URL = window.location.origin;

async function checkAvailability() {
  const roomType = document.getElementById('roomTypeCheck').value;
  const resultDiv = document.getElementById('availabilityResult');
  resultDiv.innerHTML = '<div class="result loading">Checking...</div>';

  try {
    const response = await fetch(`${API_URL}/availability?room_type=${roomType}`);
    const data = await response.json();
    const cssClass = data.available ? 'available' : 'unavailable';
    const message = data.available
      ? `✅ ${data.rooms_left} ${roomType} room(s) available`
      : `❌ No ${roomType} rooms available`;
    resultDiv.innerHTML = `<div class="result ${cssClass}">${message}</div>`;
    document.getElementById('status').textContent = 'Ready';
  } catch (error) {
    resultDiv.innerHTML = `<div class="result unavailable">Error: ${error.message}</div>`;
    document.getElementById('status').textContent = 'Error';
  }
}

async function bookRoom() {
  const roomType = document.getElementById('roomTypeBook').value;
  const nights = parseInt(document.getElementById('nights').value);
  const resultDiv = document.getElementById('bookingResult');

  if (!nights || nights < 1) {
    resultDiv.innerHTML = '<div class="result unavailable">Please enter valid number of nights</div>';
    return;
  }

  resultDiv.innerHTML = '<div class="result loading">Processing booking...</div>';
  document.getElementById('status').textContent = 'Booking...';

  try {
    const response = await fetch(`${API_URL}/book`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ room_type: roomType, nights: nights })
    });
    const data = await response.json();
    const cssClass = data.status === 'confirmed' ? 'available' : 'unavailable';
    const message = data.status === 'confirmed'
      ? `✅ Booking confirmed! ID: ${data.booking_id} for ${nights} night(s)`
      : '❌ Booking failed';
    resultDiv.innerHTML = `<div class="result ${cssClass}">${message}</div>`;
    document.getElementById('status').textContent = 'Ready';
  } catch (error) {
    resultDiv.innerHTML = `<div class="result unavailable">Error: ${error.message}</div>`;
    document.getElementById('status').textContent = 'Error';
  }
}

window.addEventListener('load', checkAvailability);
