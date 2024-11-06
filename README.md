# 📘 Instrucciones para Levantar y Usar la Aplicación NestJS

## Requisitos Previos

Antes de ejecutar la aplicación, asegúrate de tener instalados los siguientes programas:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/) o acceso a una base de datos de MongoDB Atlas

## 🚀 Instrucciones para Ejecutar la Aplicación en Local

1. **Clonar el repositorio**  
   Clona el repositorio en tu máquina local:
   ```bash
    git clone https://github.com/robinalva28/movies-management-nestjs.git
    cd movies-management-nestjs
   ```  
   
2. **Instalar las Dependencias**  
   Instala las dependencias del proyecto con el siguiente comando:
   ```bash
   npm install
   ```
   
3. **Configurar las Variables de Entorno**
    Crea un archivo `.env` en la raíz del proyecto y añade las siguientes variables de entorno:
    ```env
    MONGO_URI=
    MONGO_DB_NAME=
    PORT=3000
    JWT_SECRET=S1L3e63st0h3lpM3Pl3a5e4M031M4t3D4m3m4Te
    ```
    Si estás utilizando MongoDB Atlas, puedes añadir la URI de conexión en la variable `MONGODB_URI`.
4. **Ejecutar la Aplicación**  
   Para ejecutar la aplicación en modo de desarrollo, utiliza el siguiente comando:
   ```bash
   npm run start:dev
   ```

5. **Acceder a la Aplicación**
6. **Documentación de la API**  
   Puedes acceder a la documentación de la API en la siguiente URL:  
   [http://localhost:3000/api/docs](http://localhost:3000/api/docs)

## 📦 Instrucciones de Uso de la Aplicación

1. **Autenficación y Autorización**  
   La aplicación utiliza JWT para autenticar y autorizar el acceso de los usuarios.

   Los usuarios deben registrarse e iniciar sesión para obtener un token de acceso.

   Los endpoints están protegidos según el rol del usuario:

    - **Usuarios Regulares**: Acceso limitado a la visualización de películas.
    - **Administradores**: Acceso a creación, actualización y eliminación de películas.

2. **Gestión de Usuarios**
    - **Registro de Usuarios**: Los usuarios pueden registrarse proporcionando un nombre de usuario, correo electrónico y contraseña.
    - **Inicio de Sesión**: Los usuarios pueden autenticarse y obtener un token de acceso JWT.

3. **Endpoints de la API**
    - **Autenticación**
        - `POST /api/v1/users`: Registro de nuevos usuarios.
        - `POST /api/v1/users/auth/sign-in`: Inicio de sesión y obtención de token JWT.
    - **Películas**
        - `GET /api/v1/movies`: Obtiene la lista de películas (disponible para todos los usuarios no autenticados).
        - `GET /api/v1/movies/:id`: Obtiene los detalles de una película específica (solo accesible para "Usuarios Regulares Autenticados").
        - `POST /api/v1/movies`: Crea una nueva película (solo accesible para "Administradores" con el rol `ROLE_ADMINISTRATOR_FULL_ACCESS` o `ROLE_ADMINISTRATOR_ONLY_CREATE`).
        - `PATCH /api/v1/movies/:id`: Actualiza una película existente (solo accesible para "Administradores" con el rol `ROLE_ADMINISTRATOR_FULL_ACCESS` o `ROLE_ADMINISTRATOR_ONLY_UPDATE`).
        - `DELETE /api/v1/movies/:id`: Elimina una película (solo accesible para "Administradores" con el rol `ROLE_ADMINISTRATOR_FULL_ACCESS` o `ROLE_ADMINISTRATOR_ONLY_DELETE`).
    - **Sincronización**
        - Suerte de cron de sincronización de películas: Sincroniza el listado de películas desde la API de Star Wars. también una lista de películas mockeadas.
        - Al arrancar la aplicación también se persisten los permisos y roles en la base de datos.
