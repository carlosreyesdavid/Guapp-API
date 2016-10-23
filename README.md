# API GuApp!

## Descripción

API para la gestión de locales

## Modelo de datos

Local {
    name: String, required, unique
    local_type: String
    address: String
    phone: String
    web: String
    descripcion: String
    schedules: [Schedule]
}

Schedule {
    day: String
    hours: Hour
}

Hour {
    schedule_start: String
    schedule_end: String 
}

##API

| URI                      | Método | Descripción                            |
| ------------------------ |:------:| --------------------------------------:|
| /                        | GET    | Aplicación Cliente                     |
| /api/v1                  | GET    | API Root                               |
| /api/v1/locals           | GET    | Listar todos los locales               |
| /api/v1/locals           | POST   | Insertar un local                      |
| /api/v1/locals/:id       | GET    | Listar un local por su ID              |
| /api/v1/locals/:id       | PUT    | Modificar un local por su ID           |
| /api/v1/locals/:id       | DELETE | Borrar un local por su ID              |

## Datos Técnicos

**Servidor**
- NodeJs

**Base de datos**
- MongoDB

**Dependencias para el desarrollo**
- ExpressJS
- Mongoose
- Body-parser

**Test**
- Mocha
- Chai
- chai-http
- Supertest
- Expect
- request

##Gestión de tareas

**TRELLO**

[Tablero Trello](https://trello.com/b/M9OcNmRC/guapp)
