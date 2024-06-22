FROM node:18

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install --omit=dev

COPY . .

RUN npm rebuild bcrypt --build-from-source

RUN npm run build

ENV MONGO_URI="mongodb+srv://fabiano:fabiano@app.4x3lw9q.mongodb.net/?retryWrites=true&w=majority&appName=app"
ENV MONGO_URI_TEST="mongodb+srv://fabiano:fabiano@app.4x3lw9q.mongodb.net/?retryWrites=true&w=majority&appName=app"
ENV PORT=3001
ENV JWT_SECRET="mysecretkey"
ENV NODE_ENV="prod"

CMD ["npm", "run", "start"]


