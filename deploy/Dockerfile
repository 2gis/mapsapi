FROM nginx:alpine

# Удалить дефолтную конфигурацию nginx
RUN rm /etc/nginx/conf.d/default.conf

# Копируем кастомную конфигурацию nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Копируем собранные файлы (предполагается, что они уже с примененным конфигом)
COPY dist/ /usr/share/nginx/html/

# Открываем порт 80
EXPOSE 80

# Запускаем nginx
CMD ["nginx", "-g", "daemon off;"]
