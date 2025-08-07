# Tharwah Academy Platform – Frontend (2025)

**Role:** Freelance Frontend Developer via Upwork

A responsive and interactive education platform frontend built by transforming Figma designs into a feature-rich React app, fully integrated with backend APIs for seamless content and user management.

---

##  Features

- Interactive, responsive UI crafted from Figma using React and Tailwind CSS  
- Dynamic content rendering from RESTful APIs: articles, questions, library resources, and user information  
- Admin dashboard for content management (articles, categories, tags, questions, users, library uploads)  
- JWT-based authentication & authorization ensures secure access to admin pages  
- State management and routing via React Router (and optionally Context API or Redux)  
- Smooth and secure frontend-backend interaction for both users and admin workflows  

---

##  Tech Stack

- **Frontend:** React.js  
- **Styling:** Tailwind CSS  
- **API Integration:** Axios or Fetch for RESTful communication  
- **Routing & State:** React Router + (Context API / Redux)  
- **Auth:** JWT-based (tokens stored securely, e.g., HTTP-only cookies or localStorage)  

---

##   Project Structure

```bash
src/
├── api/               # API calls (e.g., auth, content, library)
├── components/        # Reusable UI parts (Navbar, ArticleCard, Dashboard widgets)
├── pages/             # Main page components (Home, ArticleList, Login, Dashboard)
├── rtk/               # redux toolkit to handle global state
├── hooks/             # Custom hooks (e.g., useAuth, useFetch)
├── assets/            # Images, icons
├── utils/             # Helpers for token handling, formatting, etc.
└── App.jsx

##  Installation & Running

git clone https://github.com/moyoussef11/Tharwah-Acedemy-Front.git
cd Tharwah-Acedemy-Front
npm install
npm run dev   # or npm start
