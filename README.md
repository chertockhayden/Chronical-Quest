# Chronicle Quest

Chronicle Quest is an AP World History study app with:

- official AP World History: Modern unit structure
- email sign-in and personal profiles
- points, coins, and upgrade purchases
- curriculum-aligned games
- a shared peer question-and-answer board
- Supabase for auth and database storage

## Project files

- App page: [public/index.html](/Users/haydenchertock/Documents/New%20project/public/index.html)
- Frontend logic: [public/app.js](/Users/haydenchertock/Documents/New%20project/public/app.js)
- Styles: [public/styles.css](/Users/haydenchertock/Documents/New%20project/public/styles.css)
- Supabase config: [public/config.js](/Users/haydenchertock/Documents/New%20project/public/config.js)
- Supabase SQL setup: [supabase/setup.sql](/Users/haydenchertock/Documents/New%20project/supabase/setup.sql)
- Local preview server: [server.js](/Users/haydenchertock/Documents/New%20project/server.js)
- Vercel config: [vercel.json](/Users/haydenchertock/Documents/New%20project/vercel.json)

## 1. Create your Supabase project

1. Go to [supabase.com](https://supabase.com/) and create an account.
2. Click `New project`.
3. Pick an organization, give the project a name, and set a database password.
4. Wait for the project to finish provisioning.

## 2. Create the database tables and functions

1. In Supabase, open `SQL Editor`.
2. Click `New query`.
3. Open [supabase/setup.sql](/Users/haydenchertock/Documents/New%20project/supabase/setup.sql).
4. Copy everything in that file and paste it into the SQL Editor.
5. Click `Run`.

This creates:

- `profiles`
- `questions`
- `answers`
- Row Level Security policies
- reward and purchase functions so users cannot just edit their own points in the browser

## 3. Turn on email sign-in

1. In Supabase, go to `Authentication`.
2. Make sure the `Email` provider is enabled.
3. For the easiest first test, go to `Authentication` -> `Providers` -> `Email` and turn off `Confirm email`.

That last part is optional, but it makes first-time testing much easier.

## 4. Add your Supabase project keys to the app

1. In Supabase, go to `Project Settings` -> `API`.
2. Copy these two values:
   - `Project URL`
   - `anon public` key
3. Open [public/config.js](/Users/haydenchertock/Documents/New%20project/public/config.js).
4. Replace the placeholder text with your real values.

Important:

- Use the `anon` key only.
- Do not put your `service_role` key in the frontend.
- The `anon` key is meant to be public. The real protection comes from the SQL policies in Supabase.

## 5. Run the app on your computer

In this project folder, run:

```bash
npm start
```

Then open:

```text
http://localhost:3000
```

## 6. How to deploy it on the web with Vercel

Vercel is a beginner-friendly hosting platform. It can publish this project as a normal website.

### Option A: Easiest path with GitHub + Vercel

1. Create a GitHub account if you do not already have one.
2. Create a new GitHub repository.
3. Upload this project folder to that repository.
4. Go to [vercel.com](https://vercel.com/) and sign in with GitHub.
5. Click `Add New...` -> `Project`.
6. Import your GitHub repository.
7. Keep the default settings and click `Deploy`.

Because this project is a static site, Vercel should publish it directly.

### Option B: Deploy from the Vercel CLI

1. Install Node.js if you do not have it.
2. Install the Vercel CLI:

```bash
npm install -g vercel
```

3. In this project folder, run:

```bash
vercel
```

4. Follow the prompts.
5. Vercel will give you a live URL when deployment finishes.

## 7. What to expect after deployment

Once it is live:

- anyone with the link can open the site
- users can sign up with email and password
- profiles, questions, answers, points, and upgrades are stored in Supabase
- the data is shared across all visitors

## 8. If sign-up does not work

Check these first:

- Did you run [supabase/setup.sql](/Users/haydenchertock/Documents/New%20project/supabase/setup.sql)?
- Did you paste the real values into [public/config.js](/Users/haydenchertock/Documents/New%20project/public/config.js)?
- Did you use the `anon` key and not the service role key?
- Is Email auth enabled in Supabase?
- If email confirmation is on, did you click the confirmation email before signing in?

## 9. Beginner explanation of how this app works

- The website itself is just the files in `public/`.
- Supabase handles the account system and the shared database.
- The SQL file sets up the database tables and the security rules.
- Vercel hosts the website so people on the internet can use it.

## 10. Safe next upgrades

Once you get the first live version working, the next good improvements would be:

- add images and badges to profiles
- add teacher or moderator roles
- add more AP-style games
- add real lesson pages for each unit
- add email confirmation back on for stronger account security
