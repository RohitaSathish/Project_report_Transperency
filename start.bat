@echo off
echo Starting Backend...
start cmd /k "cd /d d:\fullstack_sem_project\backend && node server.js"

timeout /t 2 /nobreak >nul

echo Starting Frontend...
start cmd /k "cd /d d:\fullstack_sem_project\frontend && npm start"

echo Both servers are starting...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
