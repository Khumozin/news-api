# Use Node base image
FROM node:20-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./

RUN npm ci

RUN npm install -g typescript

# Copy compiled output
COPY . .

RUN npm run build

# Start the app
EXPOSE 3000

CMD ["node", "dist/index.js"]
