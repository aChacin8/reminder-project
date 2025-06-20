# Taskly
## Introducción
Taskly es una aplicación web diseñada para la gestión de eventos personales. Permite a los usuarios registrarse, iniciar sesión de forma segura mediante JWT,  encriptacion de datos, hashing de token y cifrado de contraseñas, además permite crear eventos únicos asociados a su cuenta. Este sistema ha sido desarrollado con el objetivo de mantener la seguridad, integridad y personalización en el manejo de eventos personales, garantizando una experiencia ágil y confiable.

## Instalación 
`
git clone https://github.com/aChacin8/reminder-project.git
`

`
npm i
`

## ⚠️ Advertencia 

#### Si no cuentas con los archivos ".env" no podrás tener acceso a la página, ya que hacemos uso de variables de entorno para filtrar datos sensibles 

#### Migracion de Base de Datos 
`
knex migrate:latest
`
## Correr codigo
Tanto en el backend como en el frontend, ejecutar: 

`
npm start
`
## Autenticación y Seguridad

- Taskly implementa hashing de datos, evitando problemas de vulnerabilidad con datos sensibles, además encriptamiento de la contraseña del usuario.

- Implementa autenticación basda en tokens JWT. , asociar eventos unicos al usuario ya atenticado, 
   - Permitiendo validar sesiones de usuario  sin necesidad de almacenamiento persistente de contraseñas.
   - Asociar cada evento de forma segura al usuario autenticado.
   - Proteger rutas y operaciones que requieren autenticación con verificación del token.

### Consideraciones importantes:

-  El token es decodificado con jwt-decode para obtener datos del usuario (como id_users y email) sin comprometer seguridad.

## Registro de Usuarios
### Endpoint: POST /taskly/register

Crea un nuevo usuario con la siguiente estructura:

> {
  "first_name": "Juan",
> "last_name": "Perez",
> "email": "juan@gmail.com",
> "password": "contraseña1*",
> "address": "Calle Falsa 123",
> "phone_num": "1234567890"
}
#### La contraseña debe ser de minimo 8 caracteres, incluyendo al menos un número y un carácter especial.

### Datos encriptados:

La contraseña (password) se encripta usando bcrypt.

El email se transforma a minúsculas y se hashea para mayor privacidad.

Dirección y teléfono también se encriptan en formato AES-GCM, además, estos se desencriptan para que el usuario pueda editarlos (si gusta) una vez haya iniciado sesión.

## Login de Usuarios
##### Endpoint: POST /taskly/login
Se realiza enviando:

> {
  "email": "juan@gmail.com"
  "password": "contraseña1*"
}

##### Respuesta esperada:
> 
{
  "message": "Inicio de sesión exitoso",
  "token": "eyJhbGciOiJIUzI1NiIsInR5..."
}

## Creación de Eventos
Una vez autenticado, el usuario puede crear un evento único asociado a su cuenta.

### Endpoint: POST /taskly/events
Requiere token JWT en los headers:
> 
Authorization: Bearer <token>

##### Estructura del body de eventos:

> {
  "title": "Examen Final",
  "description": "Estudiar para examen de bases de datos",
  "start_date": "2025-05-14T08:00:00",
  "end_date": "2025-05-14T10:00:00",
  "isImportant": true
}

## Consideraciones para el Usuario
- Usa correos válidos y contraseñas seguras.

- Los eventos deben tener fechas válidas (fecha de inicio menor que la fecha final"

- ##### DATOS .ENV SENSIBLES QUE NO SE ENCUENTRAN PUBLICADOS PARA CORRER EL SERVIDOR

##  Tecnologías Usadas
- Frontend: React, Context API, jwt-decode, WebSockets, Sass.

- Backend: Node.js, Express, bcrypt, hash, crypto, websockets node-cron, jsonwebtoken.

- Base de Datos: MySQL y ORM knex.
