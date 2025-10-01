# Use official Node.js 20 image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (if present)
COPY client/package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the app
COPY client .

RUN npm i --save-dev typescript

# Build the app
RUN npm run build

# Expose port (Vite default is 5173, change if needed)
EXPOSE 5173

# Start the app
CMD ["npm", "run", "preview", "--", "--port", "5173"]
