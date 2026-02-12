$FrontendDir = "C:\Users\student\Documents\chat_gpt_frontend\my-project"
cd $FrontendDir

# Start npm run dev in a new background process (hidden window)
Start-Process powershell -ArgumentList "-NoProfile -ExecutionPolicy Bypass -Command `"npm run dev`"" -WindowStyle Hidden

Write-Host "Frontend starting in background..."
