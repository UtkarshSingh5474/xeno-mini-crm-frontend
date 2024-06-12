# Mini CRM Frontend

This is the frontend for the Mini CRM application built using Next.js. The project showcases the ability to create and manage campaigns, define audience rules, and view past campaign.

# Live Demo
Check out the live demo [here](https://xeno-mini-crm-frontend-production.up.railway.app/).

## Tech Stack

- **Framework:** Next.js
- **Styling:** Tailwind CSS
- **Hosting:** Railway
- **Authentication:** Google Authentication

## Features

- **Campaign Management:** Create and view campaigns.
- **Audience Rules:** Define audience rules with multiple conditions.
- **Dashboard:** View statistics and status of campaigns.
- **Authentication:** Secure login with Google Authentication.

## Getting Started

### Prerequisites

- Node.js
- npm or yarn

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/UtkarshSingh5474/xeno-mini-crm-frontend.git
    cd xeno-mini-crm-frontend
    ```

2. Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```

### Running the Application

1. Start the development server:
    ```bash
    npm run dev
    # or
    yarn dev
    ```

2. Open your browser and navigate to `http://localhost:3000`.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`
- `NEXT_PUBLIC_PROD_BACKEND_API_URL`  `NEXT_PUBLIC_LOCAL_BACKEND_API_URL`  (any one)

