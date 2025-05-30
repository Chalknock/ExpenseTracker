# Fullstack Django + React App

This is a fullstack web application built using **Django** for the backend and **React** for the frontend.

## 🚀 Features

- User Authentication (Register, Login, Logout)
- API powered by Django REST Framework
- Dynamic React frontend with routing
- JWT-based authentication using Djoser (optional)
- Reusable and modular component structure
- Fully responsive UI
- Integrated PostgreSQL / SQLite database
- Custom error handling and form validation

## 🛠️ Tech Stack

### Frontend
- React
- Vite (or Create React App)
- Axios
- React Router
- Tailwind CSS (or other CSS framework)

### Backend
- Django
- Django REST Framework
- Djoser (for auth)
- PostgreSQL or SQLite
- CORS Headers

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
DATABASE_URL=sqlite:///db.sqlite3  # or your PostgreSQL URL
```

### Frontend `.env`

```
VITE_API_URL=http://localhost:8000/api
```

## 📦 Build for Production

### Backend

Make sure to:
- Disable `DEBUG`
- Set `ALLOWED_HOSTS`
- Configure static and media files
- Use Gunicorn + Nginx if deploying

### Frontend

```bash
npm run build
```

Then serve the frontend from Django (using WhiteNoise or collect static files).

## 🧪 Testing

```bash
# Django tests
python manage.py test

# React tests (if using Jest/React Testing Library)
npm run test
```

## 🚀 Deployment

You can deploy on:
- Heroku
- Vercel (frontend) + Render (backend)
- DigitalOcean / GCP / AWS
- Docker (optional)

## 🙏 Acknowledgments

- [Django REST Framework](https://www.django-rest-framework.org/)
- [React](https://reactjs.org/)
- [Djoser](https://djoser.readthedocs.io/)
- [Tailwind CSS](https://tailwindcss.com/)

## 📄 License

This project is licensed under the MIT License.
