FROM node:20

RUN addgroup --system appgroup && adduser --system appuser --ingroup appgroup

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

RUN chown -R appuser:appgroup /app

USER appuser

EXPOSE 3000

CMD ["npm", "run", "start"]