FROM node:20-alpine AS production

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --production

# Copy application files
COPY server.js .
COPY index.html .
COPY README.md .
COPY read.md .

EXPOSE 3000

USER 1001

CMD ["npm", "start"]
