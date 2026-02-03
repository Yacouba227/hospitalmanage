@echo off
echo Starting Hospital Management System...

echo Installing Python dependencies...
cd backend
pip install -r requirements.txt

echo Initializing database...
python init_db.py

echo Starting backend server...
start cmd /k "python -m uvicorn main:app --reload --host 127.0.0.1 --port 8000"

echo Please wait for the backend to start...
timeout /t 5 /nobreak >nul

echo Starting frontend server...
cd ..
npm install
start cmd /k "npm run dev"

echo.
echo Application started successfully!
echo.
echo Backend: http://localhost:8000
echo Frontend: http://localhost:3000
echo.
echo Sample login credentials:
echo   Email: admin@hospital.com
echo   Password: password
echo.
pause