@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo ============================================
echo   상세페이지 생성기 시작 중...
echo   잠시 후 브라우저에서 아래 주소를 여세요:
echo     http://localhost:3000
echo   (포트가 사용 중이면 3001 등으로 뜹니다 - 아래 로그 확인)
echo   종료하려면 이 창에서 Ctrl+C 를 누르세요.
echo ============================================
echo.
call npm run dev
pause
