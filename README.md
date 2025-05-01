# 🧠 Habit Harmony Match

A rule-based compatibility scoring system to help match roommates based on daily habits and preferences.

---

## 📋 Project Description

**Habit Harmony Match** is a web-based application that evaluates how compatible two roommates are based on their personal routines and preferences such as:

- Sleep time
- Cleanliness
- Work schedule
- Food habits

The app uses a simple rule-based model to assign a compatibility score (0–100), and also supports ranking matches from mock user profiles stored in CSV format.

---

## ✨ Features

- 🔒 User Authentication (Supabase)
- 📊 Rule-Based Compatibility Scoring
- 🧹 Clean and Responsive UI with React + Tailwind + ShadCN
- 💾 Import mock profiles and rank matches
- 🔐 Password recovery support
- 🌐 Hosted with [Lovable](https://lovable.dev/)

---

## 🚀 Live Demo

👉 [View Live App](https://habit-harmony-match.lovable.app/) 


---

## 🛠️ Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, shadcn-ui
- **Auth & Backend**: Supabase
- **Deployment**: Lovable
- **State Management**: React Context API

---

## 📂 How to Run Locally

Make sure you have **Node.js** and **npm** installed.

```bash
git clone https://github.com/anjaliKumari669/habit-harmony-match.git
cd habit-harmony-match
npm install
npm run dev


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
