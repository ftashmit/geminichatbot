# 🧠 myaichatbot

A sleek, responsive **AI Chatbot UI** inspired by ChatGPT — built using **Next.js 14**, **TypeScript**, **Tailwind CSS**, and **Shadcn UI**.  
It integrates **Google Gemini 2.5 Flash API** for real-time AI responses, featuring a modern and interactive chat experience.

---

## ✨ Features

- Responsive **ChatGPT-style UI** with mobile-first design  
- **Real-time AI responses** with typing indicators and auto-scroll  
- **Secure API key handling** using `.env.local`  
- **Postman-tested API calls** for seamless integration  
- Clean, type-safe architecture with **TypeScript**

---

## 🛠️ Tech Stack

- **Frontend:** Next.js 14 · TypeScript · Tailwind CSS · Shadcn UI  
- **AI Backend:** Google Gemini 2.5 Flash API (Generative AI)  
- **Tools:** Postman · Prompt Engineering

---

## 📂 Project Structure

```
myaichatbot/
├── app/
│   ├── page.tsx          # Main Chatbot UI page
│   ├── api/
│   │   └── chat/
│   │       └── route.ts  # API endpoint to call Gemini model
│   └── globals.css       # Tailwind global styles
├── components/
│   ├── ui/               # Shadcn UI components (Button, Input, Card)
│   └── ChatBubble.tsx     # Chat bubble component
├── public/
│   └── assets/           # Any static images or icons
├── .env.local            # API key storage
├── tailwind.config.ts    # Tailwind configuration
├── package.json          # Project dependencies
└── README.md             # Project documentation
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/myaichatbot.git
cd myaichatbot
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create an `.env.local` file in the root:

```env
GEMINI_API_KEY=your_google_generative_ai_key
```

### 4. Run the development server

```bash
npm run dev
```

Then open **http://localhost:3000** in your browser.

---

## 📌 Notes

- Uses **secure API integration** for AI responses.  
- Supports **real-time message streaming** with user-friendly UX.  
- Optimized for **performance and scalability**.

---

Feel Free to colab!

 © 2025 Ashmit Dutta
