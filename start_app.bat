@echo off
echo Starting Hospital Management System...
echo.

echo Starting backend server...
cd backend
start "Backend Server" cmd /k "python -m uvicorn main:app --host 127.0.0.1 --port 8001 --reload"
cd ..

timeout /t 5 /nobreak >nul

echo Starting frontend server...
start "Frontend Server" cmd /k "npm run dev"

echo.
echo Hospital Management System is starting up!
echo.
echo Frontend will be available at: http://localhost:3000
echo Backend API will be available at: http://localhost:8001
echo.
echo You can close this window. The servers will continue running in separate windows.
echo.
echo Sample login credentials:
echo Email: admin@hospital.com
echo Password: password
echo Role: Administrator
echo.
pause