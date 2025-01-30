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

# Construir la aplicación
RUN yarn build

# Exponer el puerto en el que la aplicación se ejecutará
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["yarn", "start"]