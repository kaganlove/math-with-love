# Math with Love Platform (`mathwlove.com`)

Welcome to the new source code repository for **Math with Love**. This is a modern, high-fidelity React + Vite web application built to replace your Wix site. It integrates a marketing platform for your private tutoring business with a scalable system for free educational resources (K-College).

## Project Features
1. **Curriculum Directory & Dynamic Lessons**: Fully structured K-College lesson browser with a built-in search bar and a sample interactive lesson ("Solving Multi-Step Linear Equations") featuring live-checked multiple-choice self-assessments.
2. **Private Tutoring Services**: Responsive services guide detailing 1-on-1 tutoring ($80) and group sessions ($140), alongside a biography of Kagan Love.
3. **The Online Classroom**: An integrated, side-by-side student-teacher space with a live **Jitsi Video Call** and a **custom Canvas Drawing Whiteboard** (supports drawing, eraser, thickness settings, clearing, and notes downloads).
4. **Google AdSense & Affiliate Slots**: Built-in component (`AdsSlot`) for injecting advertising banners, displaying beautiful affiliate marketing placeholders when AdSense is off.
5. **SEO Optimization**: Fully integrated metadata, descriptions, keywords, titles, and structural links.
6. **Dark & Light Mode Support**: Responds natively to user operating system preferences for viewing comfort.

---

## Getting Started Locally

To run the project on your machine, navigate to this directory in your terminal and run:

```bash
# Install dependencies
npm install

# Start the local development server
npm run dev
```

The application will run at `http://localhost:5173/`.

---

## 1. How to Create & Push to a GitHub Repository

Since this repository is currently initialized locally, you can publish it to your GitHub account by following these steps:

1. Open your web browser and go to [GitHub.com](https://github.com/).
2. Log in and click the **+** icon in the top-right corner, then select **New repository**.
3. Name your repository `math-with-love`.
4. Choose **Public** (since your resources are free) and **do not** check "Add a README" or "Add .gitignore" (we have already created these).
5. Click **Create repository**.
6. In your local terminal, run the following commands to add the remote and push the codebase:
   ```bash
   # Add your GitHub repository link as the remote origin
   git remote add origin https://github.com/kaganlove/math-with-love.git

   # Rename branch to main
   git branch -M main

   # Push code to your repository
   git push -u origin main
   ```

Every time you modify the code in the future:
```bash
git add .
git commit -m "Describe your changes here"
git push
```

---

## 2. Setup Cloudflare Pages for Free Hosting

Cloudflare Pages offers fast, free static hosting with direct GitHub integration (it automatically builds and deploys your site on every push).

1. Log into your [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. In the left-hand sidebar, click on **Workers & Pages**.
3. Click the **Create Application** button and navigate to the **Pages** tab.
4. Click **Connect to Git** and authorize Cloudflare to access your GitHub account.
5. Choose your repository: `math-with-love`.
6. Set the following build settings:
   - **Framework preset**: `Vite` (if not auto-detected)
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
7. Click **Save and Deploy**. Cloudflare will build the site and provide a `.pages.dev` preview URL.

---

## 3. Move the Domain `mathwlove.com` to Cloudflare DNS

To point your custom domain `mathwlove.com` to your new website:

1. In the Cloudflare Dashboard, click **Add a Site** (top right of main screen).
2. Enter `mathwlove.com` and click **Add Site**.
3. Select the **Free Plan** (at the bottom) and click **Continue**.
4. Cloudflare will automatically import your existing Wix DNS records. Click **Continue**.
5. Cloudflare will provide you with **two Nameservers** (e.g. `kevin.ns.cloudflare.com` and `olivia.ns.cloudflare.com`). Copy them.
6. Log into your **Wix account** and go to **Domains** under site settings.
7. Select **Manage DNS Records** or **Change Nameservers** next to `mathwlove.com`.
8. Change your nameservers from Wix's to the custom Cloudflare nameservers you copied.
9. Return to Cloudflare and click **Check Nameservers** (DNS changes can take up to 24 hours to propagate).
10. Once propagation is complete, go back to **Workers & Pages** -> your `math-with-love` app -> **Custom Domains** tab, click **Set up a custom domain**, enter `mathwlove.com`, and click **Activate**.

---

## Future Enhancements
- **Google AdSense Activation**: Open `src/components/AdsSlot.jsx` and replace the placeholder text with your real `adSlotId` and `publisherId` props, then uncomment the script tag in `index.html`.
- **Whiteboard Collaboration**: Upgrade the local `<canvas>` context to synchronize strokes using a WebSockets server (e.g., Socket.io or ShareDB).
- **Interactive Syllabus expansion**: Add lessons under the levels inside `src/data/curriculumData.js` by matching the structure of `sampleLessons`.
