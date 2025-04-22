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
NEXT_PUBLIC_YOUTUBE_API_KEY=your_youtube_api_key_here
```

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

For most hosting platforms, you'll need to set the environment variables in their configuration dashboard. 