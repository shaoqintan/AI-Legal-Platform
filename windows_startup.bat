@echo off
REM Open a new command prompt window and navigate to the Frontend directory
start cmd /k "cd Frontend && npm install && npm run dev"

REM Use current command prompt window and navigate to the Server directory
cd Server && npm install && npm run start:dev"


REM created on 12/3/2024 by Lim Wei Xin