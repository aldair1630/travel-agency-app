# 🌍 Travel Agency App

![Screenshot Student App](/Home.png)

Aplicación web universitaria para gestión de reservas de vuelos y destinos turísticos. Permite a los usuarios registrarse, iniciar sesión, buscar vuelos por ciudad o país, guardar planes de viaje y gestionar sus reservas de manera sencilla y segura.

---

## 🚀 Características principales

- **Autenticación de usuarios** (registro, login, logout)
- **Búsqueda de vuelos** por ciudad, país o código IATA
- **Catálogo de destinos turísticos**
- **Gestión de reservas y planes de viaje**
- **Panel de usuario personalizado**
- **Sistema de caché para vuelos** (mejor rendimiento)
- **Interfaz moderna y responsiva**
- **Protección de rutas privadas**
- **Mensajes de error y éxito amigables**
- **Desarrollado con React, Node.js, Express y Sequelize**

---

## 📂 Estructura del Proyecto

```
travel-agency-app/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── utils/
│   │   ├── app.js
│   │   ├── db.js
│   ├── .env
│   ├── package.json
│   └── index.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── views/
│   │   ├── App.js
│   │   ├── index.js
│   ├── .env
│   ├── package.json
│   └── README.md
│
└── README.md
```

---

## 🛠 Tecnologías utilizadas

- **Frontend:** React 18, React Router 6, Context API, Tailwind CSS, Axios, React Icons, React Spinners
- **Backend:** Node.js, Express, Sequelize, PostgreSQL, JWT, Bcrypt, Axios
- **Otros:** Dotenv, Morgan, Cors, Nodemon

---

## ⚙️ Instalación y configuración

### 1. Clonar el repositorio

```bash
git clone https://github.com/aldair1630/travel-agency-app.git
cd travel-agency-app
```

### 2. Configurar el backend

```bash
cd backend
cp .env.example .env
# Edita el archivo .env con tus credenciales de base de datos y API keys
npm install
npm start
```

- Variables importantes en `.env`:
  - `DATABASE_URL` (cadena de conexión PostgreSQL)
  - `JWT_SECRET` (clave secreta para autenticación)
  - `AVIATIONSTACK_KEY` (API Key para vuelos)

### 3. Configurar el frontend

```bash
cd ../frontend
cp .env.example .env
# Edita el archivo .env si es necesario (por ejemplo, REACT_APP_API_URL)
npm install
npm start
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000)

---

## 🧑‍💻 Uso de la aplicación

1. **Registro:**  
   Accede a `/register` y crea una cuenta con tu nombre, correo y contraseña.

2. **Inicio de sesión:**  
   Ingresa en `/login` con tus credenciales.

3. **Buscar vuelos:**  
   En la página principal, ingresa ciudad o país de origen y destino, y busca vuelos disponibles. Puedes filtrar por fecha.

4. **Agregar a planes:**  
   Selecciona vuelos y agrégalos a tu lista de "Mis vuelos/planes".

5. **Gestión de reservas:**  
   Accede a tu panel de usuario para ver, agregar o eliminar vuelos y planes.

6. **Cerrar sesión:**  
   Haz clic en "Cerrar sesión" en el menú superior.

---

## 🔒 Seguridad

- Contraseñas encriptadas con Bcrypt.
- Autenticación y autorización con JWT.
- Protección de rutas privadas en frontend y backend.

---

## 📸 Capturas de pantalla

![Screenshot Student App](/Login.png)
![Screenshot Student App](/Register.png)
![Screenshot Student App](/Busqueda.png)
![Screenshot Student App](/Panel%20de%20usuario.png)

---

## 📝 Licencia

MIT License.  
Desarrollado por aldair1630 y ALVfer66 para fines académicos.

---

## 📬 Colaboradores

Aldair Rodriguez Beitar

- **Repositorio:** [https://github.com/aldair1630/travel-agency-app](https://github.com/aldair1630/travel-agency-app)
- **Email:** djaldair14@gmail.com

Alvaro Fernando Higuera Romero

- **Repositorio:** [https://github.com/aldair1630/travel-agency-app](https://github.com/aldair1630/travel-agency-app)
- **Email:** josogra18@gmail.com

---
