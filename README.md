# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/04edb6ff-57b8-45b9-87b9-0259822f33f3

# 🧠 Compatibility Scorer

A rule-based app that scores how compatible two roommates are based on lifestyle preferences: sleep time, cleanliness, work schedule, and food habits.

🔗 Live Demo: [Try the app](https://lovable.dev/projects/04edb6ff-57b8-45b9-87b9-0259822f33f3)

---

## 🚀 Features

- Input preferences and get a compatibility score (0–100)
- Optional: Upload mock profiles via CSV and get ranked matches
- Simple and clean React + Tailwind UI

---

## 🔍 How the Scoring Works

Each category (sleep time, cleanliness, work schedule, food habits) is scored independently. A perfect match gives full points for that category.

- Total score is out of 100
- Weights can be adjusted in code

---

## 🧪 Example Input

```json
{
  "user1": {
    "sleep_time": "Early",
    "cleanliness": "Tidy",
    "work_schedule": "Day",
    "food_habits": "Vegetarian"
  },
  "user2": {
    "sleep_time": "Late",
    "cleanliness": "Messy",
    "work_schedule": "Night",
    "food_habits": "Non-Vegetarian"
  }
}


**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/04edb6ff-57b8-45b9-87b9-0259822f33f3) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
