# Learning Management System for creating, organizing, and managing video courses

## Features
- Authentication
- Create courses and chapters, organized into different categories
- Handle attachemnts
- Embed videos in chapters
- Offer free or paid chapters
- Payment processing
- Track and manage user progress

## Technology

### Backend

- .NET Core RESTful API
- Clean Architecture
- Fluent NHibernate
- Identity
- MediatR
- AutoMapper
- NLog
- Docker

### Frontend

- React TypeScript
- Tailwind CSS
- Shadcn UI
- Radix UI
- Axios
- Zod
- tanstack/react-query
- tanstack/react-router
- tanstack/react-store

### Integrated 3th party services

- Clerk auth
- Cloudinary as storage storage
- Stripe for payment processing

### Notes
$env:JWT_KEY='key'

dotnet ef migrations add "Init" -p Infrastructure -s API --verbose
dotnet ef migrations remove -p Infrastructure -s API --verbose

docker build -t lms:x64 .
docker run -it --rm --env-file .env -p 5294:8080 --add-host=host.docker.internal:host-gateway lms:x64
