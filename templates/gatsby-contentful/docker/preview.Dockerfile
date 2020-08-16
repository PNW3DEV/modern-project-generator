FROM node:12.18.3

RUN apk --update add git less openssh && \
    rm -rf /var/lib/apt/lists/* && \
    rm /var/cache/apk/*

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ENV ENABLE_GATSBY_REFRESH_ENDPOINT=true

EXPOSE 8000

CMD ["npm", "run", "preview"]
