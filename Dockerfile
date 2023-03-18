version: '3.8'

services:
  frontend:
    build:
      context: ./rankMaster/react-frontend
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - REACT_APP_BACKEND_URL=http://backend:8000

  backend:
    build:
      context: ./rankMaster
      dockerfile: Dockerfile
    ports:
      - "8000:8000"
    volumes:
      - ./rankMaster:/app/backend
    command: python manage.py runserver 0.0.0.0:8000

