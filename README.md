# Деплой приложения на сервер с использованием pm2

Проект по автоматизации деплоя фронтенда и бэкенда при помощи pm2 (pm2 deploy)

## Информация о сервере

### IP-адрес сервера
```
Замените на IP-адрес вашего сервера
```

### Домены
- **Фронтенд**: `https://medutaskdeploy.nomorepartiessbs.ru` (или `http://medutaskdeploy.nomorepartiessbs.ru`)
- **Бэкенд**: `https://api.medutaskdeploy.nomorepartiessbs.ru` (или `http://api.medutaskdeploy.nomorepartiessbs.ru`)

## Структура проекта

- `backend/` - бэкенд-сервер на Node.js/Express
- `frontend/` - фронтенд-приложение на React

## Настройка деплоя

### 1. Подготовка файлов конфигурации

#### Бэкенд
Создайте файл `backend/.env.deploy` на основе `backend/.env.deploy.example`:
```bash
DEPLOY_USER=user
DEPLOY_HOST=0.0.0.0
DEPLOY_PATH=/home/user/web-plus-pm2-deploy
DEPLOY_REPO=git@github.com:username/repository.git
DEPLOY_REF=origin/master
```

Создайте файл `backend/.env` для переменных окружения:
```bash
NODE_ENV=production
JWT_SECRET=ваш-секретный-ключ
DB_ADDRESS=mongodb://localhost:27017/mestodb
PORT=3000
FRONTEND_URL=https://medutaskdeploy.nomorepartiessbs.ru
```

#### Фронтенд
Создайте файл `frontend/.env.deploy` на основе `frontend/.env.deploy.example`:
```bash
DEPLOY_USER=user
DEPLOY_HOST=0.0.0.0
DEPLOY_PATH=/home/user/web-plus-pm2-deploy
DEPLOY_REPO=git@github.com:username/repository.git
DEPLOY_REF=origin/master
```

Для продакшена создайте `frontend/.env.production`:
```bash
REACT_APP_API_URL=https://api.medutaskdeploy.nomorepartiessbs.ru
```

### 2. Деплой

#### Бэкенд
```bash
cd backend
pm2 deploy ecosystem.config.js production
```

#### Фронтенд
```bash
cd frontend
pm2 deploy ecosystem.config.js production
```

## Функциональность

- ✅ Регистрация и авторизация пользователей
- ✅ Редактирование профиля
- ✅ Добавление и удаление карточек
- ✅ Постановка и снятие лайка
- ✅ Автоматический перезапуск при падении сервера через pm2
- ✅ Эндпоинт `/crash-test` для тестирования восстановления

## Эндпоинт краштеста

Для тестирования автоматического восстановления сервера после падения доступен эндпоинт:
```
GET /crash-test
```

После запроса на этот эндпоинт сервер должен автоматически восстановиться через pm2.