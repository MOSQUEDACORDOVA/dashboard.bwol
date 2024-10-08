document.getElementById('formAuthenticationLogin').addEventListener('submit', function(event) {
  event.preventDefault();  // Evita que el formulario se envíe de manera tradicional

  const whatsapp = document.getElementById('whatsapp').value;
  const password = document.getElementById('password').value;
  const errorAlert = document.getElementById('errorAlert');

  // Reiniciar mensaje de error
  errorAlert.classList.add('d-none');
  errorAlert.textContent = '';

  // Hacer la llamada a la API de login
  fetch('https://backend.confia.mosquedacordova.com/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: whatsapp,
      password: password
    })
  })
  .then(response => response.json())
  .then(data => {
    if (data.access_token) {
      // Guardar el token en localStorage o sessionStorage
      localStorage.setItem('access_token', data.access_token);
      
      // Redirigir al usuario al dashboard o página principal
      window.location.href = '/dashboard';  // Cambia '/dashboard' por la ruta adecuada
      
    } else {
      // Mostrar un mensaje de error si no se recibe el token
      showError('Login failed: ' + (data.message || 'Invalid credentials'));
    }
  })
  .catch(error => {
    // Manejar cualquier error de red
    console.error('Error:', error);
    showError('Login failed: Network error');
  });

  function showError(message) {
    errorAlert.textContent = message;
    errorAlert.classList.remove('d-none');  // Mostrar la alerta
  }
});
