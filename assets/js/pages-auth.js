/**
 *  Pages Authentication
 */

'use strict';
const formAuthentication = document.querySelector('#formAuthentication');

document.addEventListener('DOMContentLoaded', function (e) {
  (function () {
    // Form validation for Add new record
    if (formAuthentication) {
      const fv = FormValidation.formValidation(formAuthentication, {
        fields: {
          username: {
            validators: {
              notEmpty: {
                message: 'Por favor ingresa tu nombre como aparece en tu Cédula'
              },
              stringLength: {
                min: 6,
                message: '¡🤔 Ese nombre es muy corto!'
              }
            }
          },
          email: {
            validators: {
              notEmpty: {
                message: 'Please enter your email'
              },
              emailAddress: {
                message: 'Please enter valid email address'
              }
            }
          },
          'email-username': {
            validators: {
              notEmpty: {
                message: 'Please enter email / username'
              },
              stringLength: {
                min: 6,
                message: 'Username must be more than 6 characters'
              }
            }
          },
          whatsapp: {
            validators: {
              notEmpty: {
                message: 'Por favor ingresa tu WhatsApp'
              },
              stringLength: {
                min: 10,
                max: 11,
                message: 'Por favor ingresa correctamente tu WhatsApp'
              }
            }
          },
          operation: {
            validators: {
              notEmpty: {
                message: 'Por favor ingresa el número de operación del Pago Móvil'
              },
              stringLength: {
                min: 4,
                max: 20,
                message: 'Por favor ingresa el número de operación del Pago Móvil'
              }
            }
          },
          password: {
            validators: {
              notEmpty: {
                message: 'Por favor ingresa la contraseña'
              },
              stringLength: {
                min: 6,
                message: 'Password must be more than 6 characters'
              }
            }
          },
          'confirm-password': {
            validators: {
              notEmpty: {
                message: 'Please confirm password'
              },
              identical: {
                compare: function () {
                  return formAuthentication.querySelector('[name="password"]').value;
                },
                message: 'The password and its confirm are not the same'
              },
              stringLength: {
                min: 6,
                message: 'Password must be more than 6 characters'
              }
            }
          },
          terms: {
            validators: {
              notEmpty: {
                message: 'Esto es importante'
              }
            }
          }
        },
        plugins: {
          trigger: new FormValidation.plugins.Trigger(),
          bootstrap5: new FormValidation.plugins.Bootstrap5({
            eleValidClass: '',
            rowSelector: '.mb-6'
          }),
          submitButton: new FormValidation.plugins.SubmitButton(),

          defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
          autoFocus: new FormValidation.plugins.AutoFocus()
        },
        init: instance => {
          instance.on('plugins.message.placed', function (e) {
            if (e.element.parentElement.classList.contains('input-group')) {
              e.element.parentElement.insertAdjacentElement('afterend', e.messageElement);
            }
          });
        }
      });

      // Manejar el envío del formulario
      formAuthentication.addEventListener('submit', function (event) {
        event.preventDefault(); // Evitar el envío normal del formulario

        // Validar el formulario
        fv.validate().then(function (status) {
          
          if (status === 'Valid') {  alert(1);
            const email = document.getElementById('phone-number-mask').value;
            const password = document.getElementById('password').value;
            alert(2);
            // Hacer la llamada a la API de login
            fetch('https://backend.confia.mosquedacordova.com/api/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email: email,
                password: password
              })
            })
            .then(response => response.json())
            .then(data => { alert(444);
              if (data.access_token) {
                // Guardar el token en localStorage
                localStorage.setItem('access_token', data.access_token);

                // Redirigir al usuario al dashboard
                window.location.href = '/dashboard';  // Cambia '/dashboard' por la ruta adecuada
              } else {
                // Mostrar un mensaje de error si no se recibe el token
                document.getElementById('error').textContent = 'Error de login: ' + (data.message || 'Credenciales inválidas');
              }
            })
            .catch(error => { alert(666);
              // Manejar cualquier error de red
              console.error('Error:', error);
              document.getElementById('error').textContent = 'Error de login: Error de red';
            });
          }
        });
      });

    }

    
  

    //  Two Steps Verification
    const numeralMask = document.querySelectorAll('.numeral-mask');

    // Verification masking
    if (numeralMask.length) {
      numeralMask.forEach(e => {
        new Cleave(e, {
          numeral: true
        });
      });
    }
  })();
});
