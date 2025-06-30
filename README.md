# 💡 TechQueryRecommender

A smart, AI-powered query classification system that helps organize user support queries into appropriate departments using [Cohere AI](https://cohere.com/) for natural language classification.

This is a full-stack web application with:
- ⚛️ **React** frontend (Kanban-style board)
- 🚀 **Node.js + Express** backend API
- 🧠 **Cohere AI** for semantic classification
- 🍃 **MongoDB** for data persistence

---

## 📸 Features

- 🔍 Automatically classify user queries into departments (like HR, Facilities, Tech Support, etc.)
- 🧠 Uses AI (Cohere) to interpret the intent of text
- 🗂️ Kanban board to view department-wise queries
- ➕ Add new support queries via modal
- 🧩 Create & manage departments
- 🔄 Real-time refresh after query submission

---

## 🏗️ Project Structure

TechQueryRecommender/
│
├── backend/
│ ├── models/
│ ├── controllers/
│ ├── routes/
│ └── server.js
│
├── frontend/
│ ├── src/
│ │ ├── Kanban.js
│ │ ├── Modal.js
│ │ └── ...
│ └── public/
│
└── README.md

---

## 🛠️ Tech Stack

| Layer      | Tech                                |
|------------|-------------------------------------|
| Frontend   | React, CSS                          |
| Backend    | Node.js, Express                    |
| AI Service | Cohere Classification API           |
| Database   | MongoDB (via Mongoose)              |

---

## 🚀 Getting Started

Clone the Repository

```bash
git clone https://github.com/aryamansuvaksh3010/TechQueryRecommender.git
cd TechQueryRecommender

