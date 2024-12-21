function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function updateSensorData() {
    const heartRate = getRandomValue(60, 100);
    const bloodPressure = `${getRandomValue(90, 140)}/${getRandomValue(60, 90)}`;
    const temperature = getRandomValue(36, 38);
    const oxygenLevel = getRandomValue(85, 100);
    const ecg = getRandomValue(1, 5);

    document.getElementById('heart-rate').textContent = heartRate;
    document.getElementById('blood-pressure').textContent = bloodPressure;
    document.getElementById('temperature').textContent = temperature;
    document.getElementById('oxygen-level').textContent = oxygenLevel;
    document.getElementById('ecg').textContent = ecg;

    checkAlerts(heartRate, temperature, oxygenLevel);
}

function checkAlerts(heartRate, temperature, oxygenLevel) {
    const alertMessage = document.getElementById('alert-message');

    // Retrieve thresholds from localStorage or set defaults
    const heartThreshold = localStorage.getItem('heart-threshold') || 100;
    const tempThreshold = localStorage.getItem('temp-threshold') || 37;
    const oxygenThreshold = localStorage.getItem('oxygen-threshold') || 90;

    if (heartRate > heartThreshold || temperature > tempThreshold || oxygenLevel < oxygenThreshold) {
        alertMessage.textContent = "⚠️ Alert! Abnormal readings detected!";
    } else {
        alertMessage.textContent = "No alerts at the moment.";
    }
}

function saveSettings() {
    const heartThreshold = document.getElementById('heart-threshold').value;
    const tempThreshold = document.getElementById('temp-threshold').value;
    const oxygenThreshold = document.getElementById('oxygen-threshold').value;

    localStorage.setItem('heart-threshold', heartThreshold);
    localStorage.setItem('temp-threshold', tempThreshold);
    localStorage.setItem('oxygen-threshold', oxygenThreshold);

    alert('Threshold settings saved!');
}

// Add event listener for the save button
document.getElementById('save-settings').addEventListener('click', saveSettings);

// Update sensor data every 3 seconds
setInterval(updateSensorData, 3000);
