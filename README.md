# Sales-Agent-Dashboard
A responsive sales agent dashboard that facilitates the management of school accounts, invoicing, and collections, including data visualization for targets and sign-ups.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Local Development](#local-development)
- [Deployment](#deployment)
- [Additional](#additional)
- [License](#license)

Below are the instructions to clone the repository, install dependencies, run the project locally, and deploy it on Vercel.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/en/) (version 12 or higher)
- [Angular CLI](https://angular.io/cli) (globally installed)
- [Git](https://git-scm.com/)

## Installation

To get started, follow these installation steps:

1. Go to the directory where you want to create your project and clone the repo:
    
```bash
git clone https://github.com/NjorogeMaurice/Sales-Agent-Dashboard.git
```

2. Then change into the project directory:

```bash
cd Sales-Agent-Dashboard
```

3. Install the project dependencies using npm (Node Package Manager):
   
```bash
npm install
```

## Local Development

1. Start the development server:

```bash
ng serve
```

2. Open your browser and navigate to http://localhost:4200. The app will automatically reload if you change any of the source files.

## Deployment

This project was deployed on Vercel.

To deploy this project on Vercel, follow these steps:

1. If you haven't already, install the Vercel CLI globally

```bash
npm install -g vercel
```

2. Build your Angular application for production

```bash
ng build --prod
```

This command will create a dist/ directory with your production build.

3. Deploy the application using the Vercel CLI

```bash
vercel
```

Follow the prompts to configure your project. Once the deployment is complete, Vercel will provide you with a live URL for your application.

## Additional Resources

- [Angular Documentation](https://angular.io/docs)
- [Vercel Documentation](https://vercel.com/docs)

