#!/bin/bash
# Скрипт для применения конфигурации к собранным файлам
# Используется в CI перед сборкой Docker-образа

set -e

# Параметры
DIST_DIR="${1:-dist}"
BASE_URL="${BASE_URL:-//maps.api.2gis.ru/2.0}"
PROTOCOL="${PROTOCOL:-http:}"
WEB_API_KEY="${WEB_API_KEY:-}"
WEB_API_VERSION="${WEB_API_VERSION:-2.0}"

echo "Applying configuration to files in ${DIST_DIR}..."
echo "BASE_URL: ${BASE_URL}"
echo "PROTOCOL: ${PROTOCOL}"

# Функция для замены плейсхолдеров в файле
apply_replacements() {
    local file="$1"

    if [ ! -f "$file" ]; then
        echo "File not found: $file"
        return 1
    fi

    # Создаем временный файл
    local tmp_file="${file}.tmp"

    # Читаем файл и применяем замены
    sed \
        -e "s|__BASE_URL__|${BASE_URL}|g" \
        -e "s|__ORIGINAL_BASE_URL__|${BASE_URL}|g" \
        "$file" > "$tmp_file"

    # Заменяем оригинальный файл
    mv "$tmp_file" "$file"

    echo "Applied config to: $file"
}

# Применяем к index.html
if [ -f "${DIST_DIR}/index.html" ]; then
    apply_replacements "${DIST_DIR}/index.html"
else
    echo "Warning: ${DIST_DIR}/index.html not found"
fi

# Применяем к loader.js (если он есть в dist)
if [ -f "${DIST_DIR}/loader.js" ]; then
    apply_replacements "${DIST_DIR}/loader.js"
else
    echo "Warning: ${DIST_DIR}/loader.js not found"
fi

echo "Configuration applied successfully!"
