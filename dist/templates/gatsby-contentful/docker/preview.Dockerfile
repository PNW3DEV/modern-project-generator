FROM node:12.18.3

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

ENV ENABLE_GATSBY_REFRESH_ENDPOINT=true

EXPOSE 8000

CMD ["npm", "run", "preview"]
