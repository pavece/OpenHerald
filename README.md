# Open Herald

![Banner image](https://res.cloudinary.com/dnh0go0q2/image/upload/v1724838412/Captura_de_pantalla_2024-08-28_114616_tnhxhz.png)

A self-hosted news publishing platform with an integrated Content Management System (CMS). This project is designed as a learning experience and a portfolio piece, with no intention of replacing or serving as a substitute for any existing publishing system or platform.

## Key Features

- Self-hosted solution for complete control over your content
- Built-in CMS for easy article creation and management
- Integrated AD system
- Simple audience metrics manager for basic analytics
- Role-based user system with single use link protected registration process
- Info banner system for important announcements
- Customizable

## Development setup

To run this project in a development environment, follow these steps:

1. Clone the repository

```bash
git clone https://github.com/pavece/OpenHerald
```

2. Install dependencies

```bash
npm install
```

3. Set up environment variables

- Rename .env.template to .env
- Generate a random secret for the auth
- Generate a Google OAuth ID and secret [Google Cloud Console](https://console.cloud.google.com/)
- Go to [Cloudinary](https://cloudinary.com) and get your API keys

1. Spin up local databases

```bash
# Make sure docker is running
docker compose up -d
```

5. Run prisma migrations

```bash
npx prisma migrate dev --name init
```

6. Execute seed procedure

```bash
npm run seed
```

7. Run the project

```bash
npm run dev
```

8. Visit the project on [http://localhost:3000](http://localhost:3000)

- Go to the footer and click dashboard
- Use email: **bob@openherald.com** pass: **password** to login as super admin
- Explore and test!


## Host open herald

This is a NextJS app. In order to host it I recommend to use [Vercel](https://vercel.com) as it is the simplest way to do it. But you can use any solution of your choice.

1. Host databases

    You will need to spin up a hosted Postgres instance and a hosted Redis instance. You can use [Neon](https://neon.tech/) and [Upstash](https://upstash.com/) for example.

2. Clone the project and run locally with the env variables changed
3. Prepare databases

```bash
    # Once the variables are changed you can run the migration
    npx prisma migrate dev --name prod

    # Then run the partial seed procedure (won't create articles, only categories and configs)
    npm run seed:partial
```

> [!WARNING]  
> Make sure to replace redis:// with rediss:// if using TLS for the redis hosting.

4. Fill the remaining variables

- Generate a random secret for the auth
- Generate a Google OAuth ID and secret [Google Cloud Console](https://console.cloud.google.com/)
- Go to [Cloudinary](https://cloudinary.com) and get your API keys
  
5. Host the project to your desired platform (make sure to include all the env variables)
6. Create super-admin user  
   Once running visit **yoururl.com/auth/register** and create the super admin user. Then you can start creating categories, articles, ads and registering new users using the single use links.

> [!IMPORTANT]  
> If using Vercel replace the build command with npx prisma generate && npm run build.
