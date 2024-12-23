
# Chat Application API

This project is a REST API for a simple chat application built with Node.js, Fastify, PostgreSQL, and Sequelize ORM.

---

## **Features**
- User registration with Basic Authentication.
- Create messages (text and file types).
- Retrieve messages with pagination.
- Retrieve raw message content.
- Swagger documentation.
- Docker support with `docker-compose`.

---

## **Requirements**

- **Node.js** (>= 18.x)
- **Docker** and **Docker Compose** (>= 3.8)

---

## **Getting Started**

### **1. Clone the repository:**
```bash
git clone https://github.com/Zak-Roz/acord.git
cd acord
```

### **2. Create environment variables file (.env):**
```bash
cp .env.example .env
```
Modify values in `.env` if needed (e.g., database credentials).

---

## **Running with Docker**

### **1. Build and start containers:**
```bash
sudo docker-compose up
```
This command:
- Builds the Docker image.
- Starts the PostgreSQL database container.
- Runs database migrations.
- Starts the Fastify server.

### **2. Access the server:**
- **API Base URL:** http://localhost:3000
- **Swagger Documentation:** http://localhost:3000/docs

---

## **Database Migrations**

If you need to re-run migrations, use:
```bash
docker-compose exec migrate npx sequelize db:migrate --url postgres://postgres:postgres@postgres:5432/chatdb
```

---

## **API Documentation**

The Swagger UI provides interactive documentation and testing for the API.
Visit: [http://localhost:3000/docs](http://localhost:3000/docs)

---

## **Usage**

### **1. Register a User:**
```http
POST /account/register
```
**Request Body:**
```json
{
  "username": "testuser",
  "password": "password123"
}
```

### **2. Create a Message:**
```http
POST /message/text
```
**Request Body:**
```json
{
  "text": "Hello, world!"
}
```

### **3. Get Messages:**
```http
GET /message/list?offset=0&limit=10
```

---

## **Troubleshooting**

### **1. Database Connection Issues:**
- Ensure PostgreSQL is running inside Docker.
```bash
docker logs chat-postgres
```

### **2. Server Logs:**
Check logs for errors:
```bash
docker logs chat-app
```

### **3. Access Swagger Documentation:**
Verify the server is running:
```bash
curl -I http://localhost:3000/docs
```

---

## **License**
This project is licensed under the MIT License.
