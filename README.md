# One Minute Grace

A Next.js website for One Minute Grace, providing daily spiritual inspiration in just one minute.

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
```

## Environment Variables

Before running the development server, create a `.env.local` file in the root directory with the following variables:

```
YOUTUBE_API_KEY=your_youtube_api_key_here
```

For local development, copy `.env.example` to `.env.local` and add your API keys.

You'll need to get your own YouTube API key from the [Google Developer Console](https://console.developers.google.com/).

## Development

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Building for Production

To build the application for production:

```bash
npm run build
# or
yarn build
```

Then start the production server:

```bash
npm run start
# or
yarn start
```

## Deployment

This project can be deployed on any platform that supports Next.js, such as:

- [Vercel](https://vercel.com/): The easiest option, with automatic deployments from Git
- [Netlify](https://www.netlify.com/): Another great option with similar features
- [AWS Amplify](https://aws.amazon.com/amplify/): For AWS users

### Environment Variables on Vercel

For Vercel deployment, you'll need to:

1. Add the environment variables in the Vercel dashboard under your project settings
2. Make sure to add `YOUTUBE_API_KEY` (without the NEXT_PUBLIC_ prefix as it's server-side only)
3. After adding the variables, redeploy your application

Environment variables are securely stored and only accessible on the server side. 