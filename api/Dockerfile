
# Use the official Node.js image as the base image
FROM node:20

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY api/package*.json ./

# Install the application dependencies
RUN npm install

# Install Drizzle CLI globally
RUN npm install -g drizzle-kit

# Copy the rest of the application files
COPY api .

# Build the NestJS application
RUN npm run build

# Expose the application port
EXPOSE 3000

# Command to run the application
CMD ["npm", "run", "start"]