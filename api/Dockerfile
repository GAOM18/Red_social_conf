# Usar una imagen base de Node.js
FROM node:16

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar el archivo package.json y yarn.lock
COPY package.json yarn.lock ./

# Instalar las dependencias
RUN yarn install

# Copiar el resto de la aplicación
COPY . .

# Exponer el puerto en el que la API se ejecutará
EXPOSE 8800

# Comando para ejecutar la API
CMD ["yarn", "start"]