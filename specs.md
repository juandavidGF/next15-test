## Project Overview
A web application designed to streamline content creation for social media, with a focus on AI and technology topics. The tool aims to help creators efficiently capture, edit, and publish engaging content across multiple platforms.


### Stack
* NextJs 15,
* react 19,
* tailwind
* typescript

```
package.json
"dependencies": {
  "@radix-ui/react-label": "^2.1.0",
  "@radix-ui/react-slot": "^1.1.0",
  "axios": "^1.7.9",
  "class-variance-authority": "^0.7.1",
  "clsx": "^2.1.1",
  "lucide-react": "^0.468.0",
  "next": "15.0.4",
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "tailwind-merge": "^2.5.5",
  "tailwindcss-animate": "^1.0.7"
},
```

## Feature Requirements

### Phase 1: Basic Content Capture and Storage
1. **Publishing to Instagram**
   - Integration with Instagram,

2. **Publishing to X (twitter)**
  - Integration with X,


2. **Multi-Platform Publishing**
   -  TikTok, YouTube APIs
   - Automated posting capabilities
   - Scheduling and time-based publishing options


## Relevant Documentation and References

### Example code to publish to Instagram

``` // Function to post an image to Instagram
async function postToInstagram(imageUrl, caption) {
    const accessToken = process.env.IG_ACCESS_TOKEN; // Access token from .env
    const userId = process.env.IG_USER_ID; // User ID from .env

    try {
        // Step 1: Create a media object
        const mediaResponse = await axios.post(`https://graph.facebook.com/v12.0/${userId}/media`, {
            image_url: imageUrl,
            caption: caption,
            access_token: accessToken
        });

        const creationId = mediaResponse.data.id;

        // Step 2: Publish the media object
        await axios.post(`https://graph.facebook.com/v12.0/${userId}/media_publish`, {
            creation_id: creationId,
            access_token: accessToken
        });

        console.log('Post was published successfully!');
    } catch (error) {
        console.error('Error posting to Instagram:', error.response.data);
    }
} 
```


### Example Code to Publish to X (Twitter)

``` 
const { TwitterApi } = require("twitter-api-v2");

require('dotenv').config();

const twitterClient = new TwitterApi({
  appKey: process.env.APP_KEY,
  appSecret: process.env.APP_SECRET,
  accessToken: process.env.ACCESS_TOKEN,
  accessSecret: process.env.ACCESS_SECRET,
});

async function run() {
  const text = "Hello World, API";
  console.log(text);
  sendTweet(text);
}

run();

async function sendTweet(tweetText) {
  try {
    await twitterClient.v2.tweet(tweetText);
    console.log("Tweet sent successfully!");
  } catch (error) {
    console.error("Error sending tweet:", error);
  }
}
```


### Expample of api serverless functions, on nextjs15

```
import { NextResponse } from 'next/server';


export async function GET() {
  try {

    return NextResponse.json(apps, { status: 200 });
  } catch (error: any) {
    console.error('Error in GET /api/create/get:', error);
    return NextResponse.json({ message: 'Error fetching app configurations', error: error.message }, { status: 500 });
  }
}
```

for post
```
export async function POST(request: Request) {

}

and the serverless funcion goes on /api/name/route.ts
```

### For UI we are using ...
[shadcn](https://ui.shadcn.com/)




## Current File Structure

.
├── README.md
├── components.json
├── next-env.d.ts
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── public
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── specs.md
├── src
│   ├── app
│   │   ├── favicon.ico
│   │   ├── fonts
│   │   │   ├── GeistMonoVF.woff
│   │   │   └── GeistVF.woff
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components
│   │   └── ui
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       └── textarea.tsx
│   └── lib
│       └── utils.ts
├── tailwind.config.ts
└── tsconfig.json


### Some of the main libraries we are using


```
package.json
"dependencies": {
  "@radix-ui/react-label": "^2.1.0",
  "@radix-ui/react-slot": "^1.1.0",
  "axios": "^1.7.9",
  "class-variance-authority": "^0.7.1",
  "clsx": "^2.1.1",
  "lucide-react": "^0.468.0",
  "next": "15.0.4",
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "tailwind-merge": "^2.5.5",
  "tailwindcss-animate": "^1.0.7"
},
```