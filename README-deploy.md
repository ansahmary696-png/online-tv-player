# Production deployment

## 1. Create environment file

Copy the example and update values:

```bash
cp .env.production.example .env
```

Update `.env` before running.

## 2. Build and run with Docker

```bash
docker compose up --build -d
```

## 3. Check app

Open:

- http://localhost
- https://localhost (if SSL certs are mounted)

## 4. Stop services

```bash
docker compose down
```

## 5. Production security notes

- Change the default admin password.
- Use a real JWT secret.
- Keep admin access restricted.
- Run behind HTTPS in real production.
- Use a trusted reverse proxy or load balancer if exposed to the internet.
