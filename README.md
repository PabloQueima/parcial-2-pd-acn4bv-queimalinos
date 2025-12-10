README — Plataformas de Desarrollo (Final)

Alumno: Pablo Queimaliños — pablo.queimalinos@davinci.edu.ar

Comisión ACN2CV. 2do cuatrimestre 2025. Escuela Da Vinci.
Docente: Sergio Medina — sergiod.medina@davinci.edu.ar

Proyecto Plataforma de Entrenamiento
1. Descripción general
El proyecto implementa una plataforma completa para gestionar usuarios, ejercicios y sesiones de entrenamiento. Incluye autenticación, paneles según rol y validación en backend.

Funciones principales:
Administración de usuarios (admin)
Gestión de ejercicios (admin)
Gestión de sesiones (entrenador)
Asignación de ejercicios a sesiones
Visualización de sesiones por parte del cliente
Sistema de login con roles

Backend Express persistiendo en Firestore
Frontend React separado, con paneles dinámicos según el rol

El objetivo es simular un entorno de trabajo real con backend REST y frontend desacoplado.

2. Tecnologías utilizadas
Backend
Node.js + Express
Firestore (Firebase Admin SDK)
bcrypt para hashing de contraseñas
Middlewares custom
Validadores basados en Firestore
Rutas RESTful
CORS + Morgan
Arquitectura por capas (controllers, models, routes, middleware)

Frontend
React
React Router DOM
Fetch API
Componentes reutilizables
Paneles por rol
CSS personalizado

3. Instalación
Backend
cd backend
npm install
npm start

Backend disponible en:
http://localhost:3000

Frontend
cd frontend
npm install
npm run dev

Frontend disponible en:
http://localhost:5173

4. Estructura del backend y frontend
backend/
controllers/
middleware/
models/
routes/
utils/
firebase.js
index.js

frontend/src/
components/
images/
pages/
services/
styles/
main.jsx
App.jsx

5. Endpoints principales
Autenticación
POST /api/login

Usuarios
GET /api/usuarios
POST /api/usuarios
PUT /api/usuarios/:id
DELETE /api/usuarios/:id

Ejercicios
GET /api/ejercicios
POST /api/ejercicios
PUT /api/ejercicios/:id
DELETE /api/ejercicios/:id
GET /api/ejercicios/buscar

Sesiones
GET /api/sesiones
POST /api/sesiones
PUT /api/sesiones/:id
DELETE /api/sesiones/:id

GET /api/sesiones/cliente/:id
GET /api/sesiones/entrenador/:id

POST /api/sesiones/:id/ejercicios
DELETE /api/sesiones/:id/ejercicios/:ejercicioId

6. Roles y permisos
Admin
Gestiona usuarios (crear, editar, eliminar)
Gestiona ejercicios
Ve totalizadores

Entrenador
Crea, edita y elimina sesiones
Asigna ejercicios a sesiones
Puede trabajar con cualquier cliente

Cliente
Visualiza las sesiones asignadas
Sin permisos de edición

7. Funcionalidad del sistema
7.1 Login con Firestore + bcrypt
Valida usuario por nombre
Compara contraseña con hash almacenado
Devuelve id, nombre y rol
El frontend guarda los datos en localStorage

7.2 Navegación según rol
Cada rol ve su propio dashboard:
/admin
/entrenador
/cliente

7.3 Gestión de usuarios
Crear usuarios con rol
Hashear contraseñas con bcrypt
Editar datos del usuario
Eliminar usuarios
Listado filtrado por rol

7.4 Gestión de ejercicios
Crear ejercicios
Editar y eliminar
Filtros por parte del cuerpo y búsqueda
Validación completa desde backend

7.5 Gestión de sesiones
Crear sesiones con título, cliente, entrenador y ejercicios
Editar y eliminar sesiones
Agregar o quitar ejercicios dentro de una sesión
Ver sesiones por cliente o entrenador

8. Persistencia en Firestore
Toda la persistencia se realiza en Firestore, reemplazando los antiguos JSON.

Colecciones utilizadas:
usuarios
ejercicios
sesiones

fileService.js fue adaptado para operar exclusivamente sobre Firestore.
Los archivos JSON locales ya no se utilizan.

9. Validaciones backend
Middlewares:

validateUsuario
Verifica nombre, contraseña y rol válido
Aplica roles permitidos: admin, entrenador, cliente

validateEjercicio
Valida tipos y campos obligatorios
Verifica estructura correcta

validateSesion (actualizado a Firestore)
Verifica título
Valida clienteId y entrenadorId contra Firestore
Verifica cada ejercicio en Firestore
Valida series y reps

10. Ejecutar el proyecto
Backend
cd backend
npm start

Frontend
cd frontend
npm run dev

Luego abrir:
http://localhost:5173