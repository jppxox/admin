const hash = '515405433c9af23befb9c2f9767dfa9806b6181663d1c90e60df755f99585bdd';

function sha256(message) {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  return crypto.subtle.digest('SHA-256', data).then(buffer => {
    const hashArray = Array.from(new Uint8Array(buffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  });
}

function login() {
  const password = document.getElementById('password').value;
  sha256(password).then(h => {
    if (h === hash) {
      window.location.href = 'panel.html';
    } else {
      document.getElementById('error-msg').textContent = 'Wrong password';
    }
  });
}

if (window.location.pathname.includes('panel')) {
  fetch('https://jppx.xyz', { method: 'HEAD' })
    .then(res => {
      document.getElementById('status').textContent = 'jppx.xyz status: ' + res.status;
    })
    .catch(() => {
      document.getElementById('status').textContent = 'Could not reach jppx.xyz';
    });

  const ctx = document.getElementById('chart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Visitors', 'Active Users', 'Errors'],
      datasets: [{
        label: 'Site Stats',
        data: [12, 19, 3],
        backgroundColor: ['#4CAF50', '#2196F3', '#f44336'],
        borderRadius: 10
      }]
    },
    options: {
      responsive: true
    }
  });
}
