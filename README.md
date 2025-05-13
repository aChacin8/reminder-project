Editor.md
Open source online Markdown editor.

-
# Taskly
##Introducción
Taskly es una aplicación web diseñada para la gestión de eventos personales. Permite a los usuarios registrarse, iniciar sesión de forma segura mediante JWT,  hashing de datos y cifrado de contraseñas, además permite crear eventos únicos asociados a su cuenta. Este sistema ha sido desarrollado con el objetivo de mantener la seguridad, integridad y personalización en el manejo de eventos personales, garantizando una experiencia ágil y confiable.
​
## Instalación 
`
git clone https://github.com/aChacin8/reminder-project.git
`
​
####Migracion de Base de Datos 
`
knex migrate:latest
`
## Correr codigo
Tanto en el backend como en el frontend, ejecutar: 
​
`
npm start
`
##Autenticación y Seguridad
- Taskly implementa hashing de datos, evitando problemas de vulnerabilidad con datos sensibles, además encriptamiento de la contraseña del usuario.
​
- Implementa autenticación basda en tokens JWT. , asociar eventos unicos al usuario ya atenticado, 
   - Permitiendo validar sesiones de usuario  sin necesidad de almacenamiento persistente de contraseñas.
   - Asociar cada evento de forma segura al usuario autenticado.
   - Proteger rutas y operaciones que requieren autenticación con verificación del token.
​
####Consideraciones importantes:
​
-  El token es decodificado con jwt-decode para obtener datos del usuario (como id_users y email) sin comprometer seguridad.
​
#Registro de Usuarios
##Endpoint: POST /taskly/register
​
Crea un nuevo usuario con la siguiente estructura:
​
> {
  "name": "Juan Pérez",
  "email": "juan@gmail.com",
  "password": "123456",
Taskly
Introducción
Taskly es una aplicación web diseñada para la gestión de eventos personales. Permite a los usuarios registrarse, iniciar sesión de forma segura mediante JWT, hashing de datos y cifrado de contraseñas, además permite crear eventos únicos asociados a su cuenta. Este sistema ha sido desarrollado con el objetivo de mantener la seguridad, integridad y personalización en el manejo de eventos personales, garantizando una experiencia ágil y confiable.

Instalación
git clone https://github.com/aChacin8/reminder-project.git

Migracion de Base de Datos
knex migrate:latest

Correr codigo
Tanto en el backend como en el frontend, ejecutar:

npm start

Autenticación y Seguridad
Taskly implementa hashing de datos, evitando problemas de vulnerabilidad con datos sensibles, además encriptamiento de la contraseña del usuario.

Implementa autenticación basda en tokens JWT. , asociar eventos unicos al usuario ya atenticado,

Permitiendo validar sesiones de usuario sin necesidad de almacenamiento persistente de contraseñas.
Asociar cada evento de forma segura al usuario autenticado.
Proteger rutas y operaciones que requieren autenticación con verificación del token.
Consideraciones importantes:
El token es decodificado con jwt-decode para obtener datos del usuario (como id_users y email) sin comprometer seguridad.
Registro de Usuarios
Endpoint: POST /taskly/register
Crea un nuevo usuario con la siguiente estructura:

{
“name”: “Juan Pérez”,
“email”: “juan@gmail.com”,
“password”: “123456”,
“address”: “Calle Falsa 123”,
“phone_num”: “1234567890”
}

Datos encriptados:
La contraseña (password) se encripta usando bcrypt.

El email se transforma a minúsculas y se hashea para mayor privacidad.

Dirección y teléfono también son encriptados con bcrypt.

Login de Usuarios
Endpoint: POST /taskly/login
Se realiza enviando:

{
“email”: “usuario1@gmail.com”
“password”: “contraseña”
}

Respuesta esperada:
{
“message”: “Inicio de sesión exitoso”,
“token”: “eyJhbGciOiJIUzI1NiIsInR5…”
}

Creación de Eventos
Una vez autenticado, el usuario puede crear un evento único asociado a su cuenta.

Endpoint: POST /taskly/events
Requiere token JWT en los headers:
http
Copiar
Editar
Authorization: Bearer

Estructura del body:
Consideraciones para el Usuario
{
“title”: “Examen Final”,
“description”: “Estudiar para examen de bases de datos”,
“start_date”: “2025-05-14T08:00:00”,
“end_date”: “2025-05-14T10:00:00”,
“isImportant”: true
}

Consideraciones para el Usuario
Usa correos válidos y contraseñas seguras.

Los eventos deben tener fechas válidas (fecha de inicio menor que la fecha final”

DATOS .ENV SENSIBLES QUE NO SE ENCUENTRAN PUBLICADOS PARA CORRER EL SERVIDOR
Tecnologías Usadas
Frontend: React, Context API, jwt-decode.

Backend: Node.js, Express, bcrypt, hash, node-cron, jsonwebtoken.

Base de Datos: MySQL.

Example
<link rel="stylesheet" href="editormd/css/editormd.css" />
<div id="test-editor">
    <textarea style="display:none;">### Editor.md

**Editor.md**: The open source embeddable online markdown editor, based on CodeMirror & jQuery & Marked.
    </textarea>
</div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
<script src="editormd/editormd.min.js"></script>
<script type="text/javascript">
    $(function() {
        var editor = editormd("test-editor", {
            // width  : "100%",
            // height : "100%",
            path   : "editormd/lib/"
        });
    });
</script>
Copy
More Examples >>

Features
Support Standard Markdown / CommonMark and GFM(GitHub Flavored Markdown);
Full-featured: Real-time Preview, Image (cross-domain) upload, Preformatted text/Code blocks/Tables insert, Code fold, Search replace, Read only, Themes, Multi-languages, L18n, HTML entities, Code syntax highlighting...;
Markdown Extras : Support ToC (Table of Contents), Emoji, Task lists, @Links...;
Support TeX (LaTeX expressions, Based on KaTeX), Flowchart and Sequence Diagram of Markdown extended syntax;
Support identification, interpretation, fliter of the HTML tags;
Support AMD/CMD (Require.js & Sea.js) Module Loader, and Custom/define editor plugins;
Compatible with all major browsers (IE8+), compatible Zepto.js and iPad;
Support Custom theme styles;
Download & install
Latest version: v1.5.0，Update: 2015-06-09



 


Or NPM install:

npm install editor.md



Or Bower install:

bower install editor.md




Change logs:

CHANGES

Dependents
Projects :

CodeMirror
marked
jQuery
FontAwesome
github-markdown.css
KaTeX
Rephael.js
prettify.js
flowchart.js
sequence-diagram.js
Prefixes.scss

Development tools :

Visual Studio Code
Sass/Scss
Gulp.js
License
Editor.md follows the MIT License, Anyone can freely use.





Fork me on Github :







Users

 Contact Us: editor.md@ipandao.com


Editor.md

Copyright © 2015-2019 Editor.md, MIT license.

Design & Develop By: Pandao     
