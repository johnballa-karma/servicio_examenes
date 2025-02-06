# Service

Api oficial para desarrollo de proyecto 

## Requisitos

Asegúrate de tener instalado lo siguiente:

- Node.js
- PostgreSQL

## Instalación

1. Clona este repositorio:

   ```bash
   git clone https://github.com/yanditv/services-app
   cd services-app
2. Instala las dependencias:
   
   ```bash
      npm install
      ```
3. Crea una base de datos en postgres
4. En la raiz del proyecto crea un archivo llamado: **.env.local**
5. Copia las variables de entorno de **.env.development** o de **.env.production** y pega en el archivo que acabas de crear **.env.local**
6. Configura las credenciales para tu servidor de base de datos local
7. Ejecuta el proyecto:
   
   - Desarrollo
   ```bash
      npm run start-dev
   ```
      - Producción
   ```bash
      npm run start-prod
   ```
La aplicación estará disponible en http://localhost:3500.

7. Es importante los pasos anteriores porque las tablas para la base de datos, se crean automaticamente.
   
8. Los end point están documentado con **swagger**, para acceder http://localhost:3500/api-docs

9.  Para probar los servicios se requiere de un proceso de autenticación utilizando el end point **/rest/auth**, esto devolverá un token de autorización, dicho token tienes que utilizár para enviar como encabezado de las peticiones con el key **Authorization** 
    - el usuario y contraseña por defecto es **admin**


## Comandos adicional
#### Genera la collecction en formato json para probar los end point con la herramienta Postman
- Desarrollo
   ```bash
       npm run generate-postman-dev
   ```
- Producción
  
   ```bash
       npm run generate-postman-prod
   ```
Ruta del salida *./utils/*


permisos 
chmod -R 755 uploads