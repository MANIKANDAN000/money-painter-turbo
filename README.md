# Money Painter Turbo
![License](https://img.shields.io/badge/License-MIT-blue.svg)
![GitHub stars](https://img.shields.io/github/stars/yourusername/money-painter-turbo?style=social)
![GitHub forks](https://img.shields.io/github/forks/yourusername/money-painter-turbo?style=social)

"Money Painter Turbo" is a real-time transaction tracking application designed to help users manage their finances with immediate updates. Built with a Django Channels backend and an Angular frontend, it provides a responsive and intuitive user experience for adding and viewing financial transactions.

## Table of Contents
1. [Features](#1-features)
2. [Working Culture](#2-working-culture)
3. [Getting Started](#3-getting-started)
    * [Prerequisites](#prerequisites)
    * [Cloning the Repository](#cloning-the-repository)
    * [Backend Setup (Django Channels)](#backend-setup-django-channels)
    * [Frontend Setup (Angular)](#frontend-setup-angular)
4. [How to Work with the Project](#4-how-to-work-with-the-project)
    * [Running Both Servers](#running-both-servers)
    * [Making Backend Changes](#making-backend-changes)
    * [Making Frontend Changes](#making-frontend-changes)
    * [Git Workflow](#git-workflow)
5. [Project Structure](#5-project-structure)
6. [Troubleshooting Common Issues](#6-troubleshooting-common-issues)
7. [Contributing](#7-contributing)
8. [License](#8-license)
9. [Contact](#9-contact)

## 1. Features
*   **Real-time Transaction Updates:** Utilizes WebSockets for instant propagation of new transactions to all connected clients.
*   **Intuitive Transaction Entry:** A user-friendly form to quickly add transaction descriptions and amounts.
*   **Dynamic Transaction List:** View an up-to-date list of all added transactions with timestamps.
*   **Robust Backend:** Powered by Django with Django Channels for efficient real-time communication.
*   **Modern Frontend:** Built with Angular for a responsive and interactive user interface.
*   **CORS Enabled:** Seamless integration between frontend and backend running on different ports/origins (development setup).

## 2. Working Culture
Our project thrives on a collaborative and efficient working culture. We value:
*   **Communication:** Clear and proactive communication is key. If you're stuck, ask questions! If you find a bug, report it!
*   **Clean Code:** Write readable, maintainable, and well-commented code. Follow PEP8 for Python and Angular style guides for TypeScript/HTML/CSS.
*   **Testing:** While not explicitly set up yet, we aim to integrate testing early. Think about how your changes can be tested.
*   **Incremental Progress:** Focus on small, manageable changes. Break down large tasks into smaller, shippable units.
*   **Respect & Support:** Be respectful and supportive of fellow contributors. We're all here to learn and build something great together.
*   **Documentation:** Keep documentation (like this README) updated as features evolve or setup changes.

## 3. Getting Started
Follow these steps to get your local development environment up and running.

### Prerequisites
Before you begin, ensure you have the following installed:
*   **Python 3.8+:** [Download Python](https://www.python.org/downloads/)
*   **pip:** Python package installer (usually comes with Python)
*   **Node.js & npm (or yarn):** [Download Node.js](https://nodejs.org/en/download/) (npm comes with Node.js)
*   **Angular CLI:**
    
    npm install -g @angular/cli
    
*   **Git:** [Download Git](https://git-scm.com/downloads)

### Cloning the Repository
First, clone the project from GitHub:

git clone https://github.com/yourusername/money-painter-turbo.git
cd money-painter-turbo
(Replace yourusername with the actual GitHub username or organization)
Backend Setup (Django Channels)
Navigate to the backend directory:
code
Bash
cd backend
Create and activate a Python virtual environment:
code
Bash
python -m venv venv
# On Windows:
.\venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate
Install backend dependencies:
code

pip install -r requirements.txt
# (If requirements.txt doesn't exist, you'll need to install them manually):
# pip install django daphne channels django-cors-headers
Apply Django migrations:
code

python manage.py makemigrations finance transactions
python manage.py migrate
Create a Django superuser (optional, for admin panel access):
code

python manage.py createsuperuser
Frontend Setup (Angular)
Navigate to the frontend directory:
code

cd ../frontend # Go up one level from backend, then into frontend
Install frontend dependencies:
code

npm install
4. How to Work with the Project
Running Both Servers
For full functionality, you need to run both the Django Channels backend and the Angular frontend concurrently.
Start the Backend (in a separate terminal):
Open a new terminal.
Navigate to money-painter-turbo/backend.
Activate your virtual environment (if you closed the previous terminal).
Run Daphne:
code

daphne -p 8000 money_painter_turbo.asgi:application
Keep this terminal open and observe for backend logs and WebSocket connection messages.
Start the Frontend (in another separate terminal):
Open another new terminal.
Navigate to money-painter-turbo/frontend.
Run the Angular development server:
code

ng serve --open
This will open your browser to http://localhost:4200/.
Now you should have both parts of the application running, and the frontend should be able to connect to the backend's WebSocket.
Making Backend Changes
Code: Modify Python files in backend/finance/, backend/transactions/, or backend/money_painter_turbo/.
Reload: Daphne will usually auto-reload on code changes. If not, restart the daphne command.
Migrations: If you change models.py, run python manage.py makemigrations <app_name> and python manage.py migrate.
Making Frontend Changes
Code: Modify TypeScript, HTML, or CSS files in frontend/src/app/.
Reload: The ng serve command provides live reloading for most frontend changes. Just save your files.
Git Workflow
We follow a standard Git Feature Branch Workflow:
Fetch the latest changes:
code

git checkout main
git pull origin main
Create a new feature branch:
code

git checkout -b feature/your-feature-name
(Use bugfix/issue-description for bug fixes, refactor/area-of-change for refactoring).
Make your changes.
Stage your changes:
code

git add .
# OR: git add frontend/src/app/path/to/file.ts backend/finance/path/to/file.py
Commit your changes:
code

git commit -m "feat: Briefly describe your feature"
# Examples:
# git commit -m "feat: Implement real-time transaction adding"
# git commit -m "fix: Resolve WebSocket 404 connection issue"
# git commit -m "chore: Update README with setup instructions"
Push your branch to GitHub:
code

git push origin feature/your-feature-name
Open a Pull Request (PR): Go to your GitHub repository and open a PR from your branch to main. Describe your changes clearly.
Get it reviewed and merge!
5. Project Structure
code
Code
money-painter-turbo/
├── backend/
│   ├── finance/                  # Django app for core finance logic (consumers, routing)
│   │   ├── __init__.py
│   │   ├── migrations/
│   │   ├── consumers.py          # WebSocket consumers (TransactionConsumer)
│   │   ├── models.py             # Django models (if any specific to finance app)
│   │   ├── routing.py            # Django Channels WebSocket URL routing
│   │   ├── serializers.py        # Django REST Framework serializers (if used)
│   │   ├── urls.py               # Django HTTP URL patterns (if any)
│   │   └── views.py              # Django HTTP views (if any)
│   ├── money_painter_turbo/      # Django project root settings
│   │   ├── __init__.py
│   │   ├── asgi.py               # ASGI application entry point (Channels setup)
│   │   ├── settings.py           # Django project settings
│   │   ├── urls.py               # Django project-level URL patterns
│   │   └── wsgi.py               # WSGI application entry point (for HTTP)
│   ├── transactions/             # Django app for transaction data/models
│   │   ├── __init__.py
│   │   ├── migrations/
│   │   ├── admin.py
│   │   ├── apps.py
│   │   ├── models.py             # Transaction model definition
│   │   ├── tests.py
│   │   ├── urls.py
│   │   └── views.py
│   ├── manage.py                 # Django management script
│   ├── db.sqlite3                # SQLite database file (development)
│   └── requirements.txt          # Python dependencies
├── frontend/
│   ├── .angular/                 # Angular CLI configuration files
│   ├── node_modules/             # Node.js dependencies
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/
│   │   │   │   ├── add-transaction/    # Component for adding new transactions
│   │   │   │   │   ├── add-transaction.component.css
│   │   │   │   │   ├── add-transaction.component.html
│   │   │   │   │   └── add-transaction.component.ts
│   │   │   │   └── transaction-list/   # Component for displaying transaction list
│   │   │   │       ├── transaction-list.component.css
│   │   │   │       ├── transaction-list.component.html
│   │   │   │       └── transaction-list.component.ts
│   │   │   ├── environments/     # Environment-specific configuration
│   │   │   ├── services/
│   │   │   │   └── websocket.service.ts  # Service to manage WebSocket connection
│   │   │   ├── models/           # Custom TypeScript interfaces/models (e.g., transaction.model.ts)
│   │   │   ├── app-routing.module.ts
│   │   │   ├── app.component.ts
│   │   │   └── app.module.ts       # Main Angular application module
│   │   ├── favicon.ico
│   │   ├── index.html            # Main HTML file
│   │   └── main.ts               # Main entry point for Angular app
│   ├── angular.json              # Angular CLI project configuration
│   ├── package.json              # Frontend (Node.js/npm) dependencies
│   └── tsconfig.json             # TypeScript configuration
├── static/                       # Django static files directory
│   ├── favicon_io.zip
│   └── favicon.ico
└── README.md
6. Troubleshooting Common Issues
"WebSocket not connected":
Backend not running: Ensure you've run daphne -p 8000 money_painter_turbo.asgi:application in a separate terminal and it shows "Listening on TCP address 0.0.0.0:8000".
Backend crashed: Check the Daphne terminal for any Python errors.
Incorrect URL: Verify ws://localhost:8000/ws/transactions/ is correct in both websocket.service.ts and finance/routing.py.
Browser Console/Network Tab: Use browser developer tools (F12) to inspect network requests (filter by WS) and console for any WebSocket errors.
ModuleNotFoundError: No module named 'xyz':
You forgot to install a Python package. Activate your venv in the backend directory and run pip install xyz (or pip install -r requirements.txt).
Can't bind to 'formGroup' since it isn't a known property of 'form'.:
You forgot to import ReactiveFormsModule in frontend/src/app/app.module.ts.
Frontend not loading/compiling:
Ensure ng serve is running in the frontend directory. Check its terminal for Angular compilation errors.
Run npm install again in frontend if dependencies seem corrupted.
7. Contributing
We welcome contributions! Please follow the Git Workflow section and the Working Culture guidelines.
Fork the repository.
Create your feature branch (git checkout -b feature/AmazingFeature).
Commit your changes (git commit -m 'Add some AmazingFeature').
Push to the branch (git push origin feature/AmazingFeature).
Open a Pull Request.
8. License
This project is licensed under the MIT License - see the LICENSE file for details.
9. Contact
Manikandan - manimugil2506@gmail.com
Project Link: https://github.com/yourusername/money-painter-turbo
(Remember to replace yourusername and your.email@example.com appropriately)
