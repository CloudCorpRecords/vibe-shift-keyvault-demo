FROM node:20-alpine AS production

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --production

# Copy application files
COPY server.js .
COPY index.html .
COPY README.md .

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s CMD curl -f http://localhost:3000/health || exit 1

USER 1001

CMD ["npm", "start"]
