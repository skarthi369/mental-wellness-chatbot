


# ## 🌿 MindfulChat: Clinical-Grade Conversational AI for Mental Wellness

**MindfulChat** is an ethically designed, AI-augmented therapeutic assistant. It leverages Large Language Models (LLMs) to provide real-time emotional support, sophisticated sentiment analysis, and proactive risk assessment for users seeking mental wellness guidance.

---

## 🚀 Key Technical Features

### 🧠 Intelligent Core

* **LLM Integration:** Powered by **Google Gemini 3 Flash** via OpenRouter, featuring native reasoning capabilities for nuanced therapeutic dialogue.
* **Real-time Emotion Engine:** Detects 6+ emotional states (Anxiety, Stress, Hope, etc.) to adapt the bot's persona dynamically.
* **Triaging & Risk Assessment:** Automated heuristic analysis to categorize user distress levels (Low, Medium, High) and provide immediate resource escalation.

### 🛠️ Therapeutic Toolkit

* **Guided Somatics:** Interactive, animated 4-4-4-2 "Box Breathing" module for immediate physiological regulation.
* **Linguistic Inclusivity:** Full support for **English, Tamil (தமிழ்), and Hindi (हिंदी)**, ensuring accessibility across diverse demographics.
* **Session Analytics:** Generates structured JSON wellness reports summarizing emotional trends and key insights.

---

## 🏗️ System Architecture

The project follows a modular **Clean Architecture** pattern to ensure scalability and maintainability.

```text
src/
├── components/          # Atomic UI components & specialized chat modules
├── hooks/               # Custom logic for State (useChat) and Persistence (useApiKey)
├── services/            # API abstraction layers (OpenRouter & Mock Fallbacks)
├── types/               # Strict TypeScript interfaces for domain entities
└── pages/               # Main application entry points

```

### **Data Flow Pipeline**

1. **Ingestion:** User input captured and sanitized.
2. **Processing:** Parallel execution of LLM inference and local sentiment analysis.
3. **Refinement:** Contextual tagging (Emotion/Risk) applied to the message state.
4. **Delivery:** UI update with smooth entry animations and adaptive color tokens.

---

## 🔧 Tech Stack

| Layer | Technology |
| --- | --- |
| **Frontend** | React 18, TypeScript, Vite |
| **Styling** | Tailwind CSS, shadcn/ui, Framer Motion |
| **State** | TanStack Query (FSM-based chat state) |
| **AI/ML** | OpenRouter API, Google Gemini 3 Flash |

---

## 🎨 Design Philosophy

MindfulChat utilizes a **Therapeutic Design System**. Colors are selected based on color psychology:

* **Teal Primary:** Promotes clarity and calmness.
* **Soft Warm Neutrals:** Reduces visual fatigue during high-stress interactions.
* **Motion Design:** Uses "Gentle Ease" transitions () to prevent jarring UI shifts.

---

## 🚦 Getting Started

### **Installation**

```bash
git clone https://github.com/skarthi369/mindfulchat.git
cd mindfulchat
npm install
npm run dev

```

### **Configuration**

Secure your API access:

1. Obtain a key from [OpenRouter](https://openrouter.ai/).
2. Navigate to the **Settings (⚙️)** in the MindfulChat UI.
3. Your key is stored locally (`localStorage`) and never touches our servers.

---

## 🛡️ Privacy & Ethical Guardrails

* **Self-Custody:** API keys and chat history remain on the client-side.
* **Crisis Protocol:** High-risk detection triggers a non-closable modal with international helpline resources.
* **Disclaimer:** This tool is an AI assistant and does not replace professional clinical diagnosis or medical intervention.

---

