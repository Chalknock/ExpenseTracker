# Fullstack Django + React App

This is a fullstack web application built using **Django** for the backend and **React** for the frontend.

## 🚀 Features

- User Authentication (Register, Login, Logout)
- User Profile with preferred currency, timezone, theme, and more
- API powered by Django REST Framework
- Token or API Key-based authentication using Djoser
- Dynamic React frontend with routing
- Reusable and modular component structure
- Integrated PostgreSQL or SQLite database
- Custom error handling and form validation

## 🛠️ Tech Stack

### Frontend
- React
- Vite
- Axios
- React Router
- CSS Modules / Plain CSS

### Backend
- Django
- Django REST Framework
- Djoser (for auth)
- PostgreSQL or SQLite
- CORS Headers
- Django REST Framework API Key (optional)

## 🗂️ Project Structure

```
project-root/
│
├── backend/
│   ├── manage.py
│   ├── backend/            # Django project
│   └── api/                # Django app
│
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       └── App.jsx
│
├── .env
└── README.md
```

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. Backend Setup

```bash
cd backend
python -m venv env
source env/bin/activate  # or env\Scripts\activate on Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

> Make sure to configure `CORS` in Django and use `.env` files to store environment variables for both backend and frontend.

## 🔐 Environment Variables

### Backend `.env`

```
SECRET_KEY=your-secret-key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
DATABASE_URL=sqlite:///db.sqlite3
```

### Frontend `.env`

```
VITE_API_URL=http://localhost:8000/api
VITE_API_KEY=your-api-key-if-using-api-key-auth
```

## 👤 User Profile

Each registered user has an associated profile with:
- Preferred currency (e.g., USD, EUR)
- Timezone (e.g., UTC, Asia/Manila)
- Theme (light/dark)
- Language preference
- Notifications enabled
- Optional profile picture upload

> Profiles are automatically created using Django signals.

## 🔓 Authentication

This app supports:
- Token-based authentication using **Djoser**
- Optional API Key-based access using **drf-api-key**

Configure your frontend to send the proper headers in requests:

```js
headers: {
  Authorization: "Token YOUR_TOKEN" // or "Api-Key YOUR_KEY"
}
```

## 📦 Build for Production

### Backend

- Set `DEBUG=False`
- Set appropriate `ALLOWED_HOSTS`
- Configure static/media file serving
- Optional: Use Gunicorn + Nginx for deployment

### Frontend

```bash
npm run build
```

> Optionally serve the built frontend from Django (not implemented yet).

## 🚀 Deployment

You can deploy this stack using:
- Render, Railway, or Heroku
- Vercel (frontend) + Backend API host
- DigitalOcean / GCP / AWS
- Docker (optional)

## 🙏 Acknowledgments

- [Django REST Framework](https://www.django-rest-framework.org/)
- [React](https://reactjs.org/)
- [Djoser](https://djoser.readthedocs.io/)
- [DRF API Key](https://florimond.dev/open-source/drf-api-key/)
- [Vite](https://vitejs.dev/)

## 📄 License

This project is licensed under the MIT License.
