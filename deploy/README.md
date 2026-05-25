# Deployment Guide

Переход на статическую раздачу через nginx.

## Архитектура

Проект теперь раздается как статические файлы через nginx без необходимости в Express-сервере. Конфигурация применяется на этапе сборки в CI.

## Файлы

- `Dockerfile` — образ на базе nginx:alpine
- `nginx.conf` — конфигурация nginx с gzip и кэшированием
- `apply-config.sh` — скрипт для применения конфигурации к собранным файлам

## Сборка в CI

### 1. Собрать проект

```bash
npm run build
```

Это создаст файлы в папке `dist/`:
- `index.html`
- `loader.js`
- `js/script.*.js`
- `css/styles.*.*.css`
- и другие статические файлы

### 2. Применить конфигурацию

```bash
# Установка прав на скрипт (если нужно)
chmod +x deploy/apply-config.sh

# Применение конфига
BASE_URL="//maps.api.2gis.ru/2.0" ./deploy/apply-config.sh dist
```

Или через Docker:

```bash
docker run --rm -v $(pwd):/app -w /app \
  -e BASE_URL="//maps.api.2gis.ru/2.0" \
  bash:alpine ./deploy/apply-config.sh dist
```

### 3. Собрать Docker-образ

```bash
docker build -t 2gis-mapsapi:latest -f deploy/Dockerfile .
```

### 4. Запуск

```bash
docker run -d -p 8080:80 --name mapsapi 2gis-mapsapi:latest
```

Сервер будет доступен по адресу `http://localhost:8080`

## Переменные окружения

При применении конфигурации можно использовать следующие переменные:

| Переменная | Описание | Значение по умолчанию |
|------------|----------|----------------------|
| `BASE_URL` | Базовый URL API | `//maps.api.2gis.ru/2.0` |
| `PROTOCOL` | Протокол | `http:` |
| `WEB_API_KEY` | API ключ | - |
| `WEB_API_VERSION` | Версия API | `2.0` |
| `DIST_DIR` | Путь к директории с файлами | `dist` |

## Пример CI/CD (GitHub Actions)

```yaml
name: Build and Deploy

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '14'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Apply config
        run: |
          chmod +x deploy/apply-config.sh
          BASE_URL="${{ secrets.BASE_URL }}" ./deploy/apply-config.sh dist
      
      - name: Build Docker image
        run: docker build -t mapsapi:${{ github.sha }} -f deploy/Dockerfile .
      
      - name: Push to registry
        run: |
          # Добавьте шаги для пуша в ваш registry
          docker push mapsapi:${{ github.sha }}
```

## Разница с предыдущей версией

### Было (Express.js)
- Сервер на Node.js + Express
- Динамическая подстановка конфига при каждом запросе
- Чтение файлов с диска при старте
- Порты 3000 по умолчанию

### Стало (nginx)
- Статическая раздача через nginx
- Конфиг применяется один раз при сборке
- Все файлы уже готовы к раздаче
- Порт 80 (стандартный для nginx)
- Лучшая производительность и кэширование
- Меньше ресурсов (nginx vs Node.js)

## Health Check

Эндпоинт `/healthcheck` возвращает `200 OK` для проверки работоспособности контейнера.

```bash
curl http://localhost:8080/healthcheck
```

## Миграция

Если вы используете старый Express-сервер:

1. Обновите переменные окружения в вашем оркестраторе (Kubernetes, Docker Swarm и т.д.)
2. Измените порт с 3000 на 80 (или настройте прокси)
3. Убедитесь, что конфигурация применена к файлам перед сборкой образа
