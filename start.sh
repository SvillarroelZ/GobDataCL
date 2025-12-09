#!/bin/bash
# GobData CL - Script de inicio
# Uso: ./start.sh

set -e

echo "GobData CL - Iniciando servicios..."

# Colores
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Matar procesos anteriores si existen
pkill -f uvicorn 2>/dev/null || true
pkill -f "vite" 2>/dev/null || true
sleep 1

# Backend
echo -e "${BLUE}[*] Iniciando Backend (FastAPI)...${NC}"
cd backend
pip install -r requirements.txt -q 2>/dev/null
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload &
BACKEND_PID=$!
cd ..

# Esperar a que el backend este listo
sleep 3

# Frontend  
echo -e "${BLUE}[*] Iniciando Frontend (Vite)...${NC}"
cd frontend
npm install --silent 2>/dev/null
npm run dev -- --host 0.0.0.0 --port 5173 &
FRONTEND_PID=$!
cd ..

sleep 2

echo ""
echo -e "${GREEN}[OK] Servicios iniciados:${NC}"
echo "    Backend:  http://localhost:8000"
echo "    API Docs: http://localhost:8000/docs"
echo "    Frontend: http://localhost:5173"
echo ""
echo "Presiona Ctrl+C para detener todos los servicios"

# Capturar Ctrl+C para limpiar
trap "echo ''; echo 'Deteniendo servicios...'; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit 0" SIGINT SIGTERM

# Mantener el script corriendo
wait
