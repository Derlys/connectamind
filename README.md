# Connectamind ![landing page](https://avatars.githubusercontent.com/u/56296236?v=4)

Connect a Mind is the answer for content creators. In this open source DApp you can upload your articles, posts and more on any topic and sell them in exchange for the token you choose from those offered by the platform. A decentralized space where education meets blockchain innovation.

## Table of content

- Demo
- Requirements
- Features
- Built with
- Develoment
- What impacted me positively
- My challenge
- What Do you need for run this project
- Build


## Demo
![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/aoezux0ox99z6egu2cf3.png)

🚀 [Mododifil.com]()


## 🤓 Features

- Connect wallet
- Upload blogs: We take the experience of uploading blogs to another level. With a few clicks, you can share your knowledge in text formats.
- Content Management: An intuitive interface makes it easy to manage your courses. Update content.
- Decentralized Payments: The entire payment and course access process is done through payment confirmation in the blockchain ecosystem.
- Posts
- Dashboard


## 👩🏽‍💻 Built with 

- Prisma
- Nest
- GraphlQL
- React
- WebStorm editor
- Mantine

## Develoment
This is my first participation in a Hackathon with a Dapp and is the reason why I wanted to get an idea of the structure of the application. After doing that, the structure of my application was organized in my mind.

I created a data model based on the features I wanted to have.



![Image description]()
  
## 💪🏽 What impacted me positively

- The evolution of web application is the same as my learning.

- Every learning of a new style framework, a new concept or a new version of Angular is reflected here. I started with Angular V8.
- The refactoring and the order it started with is currently very different. Leaving learnings about clean code, application architecture, design and more.

  ## My challenge
- Learn new syntax in style frameworks.

- The decision of where to host the data changed more than 3 times between Firebase, my own backend application that was more of a manager, and finally my own project that used Markdown.

- For server side rendering, I first had my domain and used "good daddy" and then switched to Cloudflare because it was free.

- Making the routes work was a task that involved more than 10 prototypes.

  ![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ppls4zg32x9hdozswfyt.png)

- I solved the functionality of displaying a certain amount of post on the home page with this service.

  
![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/krtoz4q5uxe7ix1yciwr.png)

  
  
## What Do you need for run this project

1. Install dependencies. You will only have to do this once.

```
npm install
```
😉 I prefer `yarn`, [here](https://www.aluracursos.com/blog/npm-vs-yarn) is an article for you to decide.

2. ng serve

## Build
- Run `ng build` to build the project.
- The build artifacts will be stored in the `/dist/mododificil.com/browser` directory.
- Use the `--prod` flag for a production build.



## Getting Started

### Prerequisites

- Node v18 or higher
- PNPM
- Docker

### Installation

Clone the repo and install dependencies:

```shell
git clone git@github.com:pubkeyapp/connectamind.git
cd connectamind
pnpm
```

### Automatic setup

You can run the automatic setup script to create the `.env` file, test the setup and push the database schema.

```shell
pnpm setup
```

### Environment variables

Copy the `.env.example` file to `.env` and fill in the missing values.

```shell
cp .env.example .env
```

### Starting the services

You will need to start the database before starting the backend.

```shell
pnpm dev:services
```

### Pushing the database schema

If you start from scratch, you will need to push the database schema to the database.

```shell
pnpm prisma db push
```

Also, after each change to the schema in `prisma/schema.prisma`, you will need to run the above command again.

### Starting the API

```shell
pnpm dev:api
```

### Starting the web ui

```shell
pnpm dev:web
```

### Starting the SDK generator

```shell
pnpm dev:sdk
```

## Extending the application

You can use the following commands to generate new models, API features, web features and SDK types.

### Adding a new model

The following command will generate a new model in `prisma/schema.prisma`.

You will need to run `pnpm prisma db push` to push the schema to the database.

```shell
pnpm nx g prisma-model company
```

Output:

```shell
> NX Generating @connectamind/tools:prisma-model

UPDATE prisma/schema.prisma
```

### Adding a new API feature

The following command will generate a new API feature in `libs/api/company/*`.

You will need to restart the API server to make sure it picks up the new libraries.

```shell
pnpm nx g api-feature company
```

Output:

```shell
> NX Generating @connectamind/tools:api-feature

CREATE libs/api/company/data-access/...
CREATE libs/api/company/feature/...
UPDATE libs/api/core/feature/src/lib/api-core-feature.module.ts
CREATE libs/sdk/src/graphql/feature-company.graphql
CREATE apps/api-e2e/src/api/api-company-feature.spec.ts
```

### Adding a new web feature

The following command will generate a new web feature in `libs/web/company/*`.

You will need to restart the web server to make sure it picks up the new libraries.

```shell
pnpm nx g web-feature company
```

Output:

```shell
> NX Generating @connectamind/tools:web-feature

CREATE libs/web/company/data-access/...
CREATE libs/web/company/feature/...
CREATE libs/web/company/ui/...
UPDATE libs/web/shell/feature/src/lib/shell-admin-routes.tsx
UPDATE tsconfig.base.json
```
