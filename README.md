# ACCA FA2 Learning Academy — Starter MVP

A static, zero-subscription-first frontend for an independent FA2 study platform.

## Included in this first implementation
- Responsive public learning landing page
- 11-chapter pedagogical navigation mapped to ACCA syllabus areas A–H
- Starter multiple-choice practice flow with explanations
- Browser-local progress counters
- Supabase Auth integration scaffold (email/password)
- Supabase SQL schema with row-level security for profiles and attempts

## Important current limitations
- This is an MVP scaffold, not the complete FA2 course or 660-question bank.
- Student registration is intentionally disabled until a Supabase project is configured.
- Progress is currently browser-local; cross-device sync is not yet wired.
- There is no hosted AI tutor in this version. A truly public AI tutor needs a hosted inference resource; no unlimited, reliable free inference is promised.
- Do not upload BPP/Kaplan copyrighted question-bank content. Use uploaded books for private study/reference only and create original questions.

## Run locally
This is a static site. Open `index.html` in a browser, or serve the folder with any static web server.

## Enable public student registration (free-tier setup)
1. Create a Supabase project on the Supabase free plan.
2. In Supabase SQL Editor, run `supabase/schema.sql`.
3. In Authentication settings, configure the site URL and allowed redirect URLs for your deployed domain.
4. Copy the project's **Project URL** and **anon/publishable key**.
5. Put them in `config.js`:
   ```js
   window.FA2_CONFIG = {
     supabaseUrl: "https://YOUR-PROJECT.supabase.co",
     supabaseAnonKey: "YOUR_PUBLIC_ANON_KEY"
   };
   ```
6. Deploy the folder to Cloudflare Pages using the free `*.pages.dev` address.
7. Test signup, email confirmation, sign-in, sign-out and RLS using two separate test accounts.

Never place a Supabase `service_role` key or any secret key in `config.js`, HTML, JavaScript or a public Git repository.

## Deploy to Cloudflare Pages
1. Create a GitHub repository and upload this folder's contents.
2. In Cloudflare Pages, create a project connected to that repository.
3. Framework preset: `None`; build command: leave blank; output directory: `/`.
4. Deploy. Add the deployed `pages.dev` URL to Supabase's allowed redirect URLs.

## Official syllabus control
Before publishing teaching content, verify the current FA2 syllabus and examinable documents on ACCA's official website. The 11 chapters here are a teaching arrangement, not ACCA's official chapter numbering. Map each learning item to official syllabus area and outcome.

## Suggested next milestones
1. Complete Chapter 1 teaching content and a fully QA-checked original question set.
2. Build question metadata and import pipeline.
3. Add server-side attempt persistence.
4. Add timed chapter tests and full mock engine.
5. Add spaced-retrieval scheduling and topic-level analytics.
6. Add a tutor interface only after choosing a sustainable inference approach.
