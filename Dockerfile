# Use Node.js version 20 as the base image
# Think of this as installing a fresh machine with Node already installed
FROM node:20

# Create a working directory inside the container
# All future commands will run from this folder
WORKDIR /app

# Copy package.json and package-lock.json first
# We do this separately to take advantage of Docker caching
COPY package*.json ./

# Install all project dependencies
# Equivalent to running "npm install" on your laptop
RUN npm install

# Copy the rest of the project files
# This includes src, public, vite.config.js, etc.
COPY . .

# Tell Docker that this container will use port 5173
# This is mainly documentation for anyone reading the Dockerfile
EXPOSE 5173

# Start the Vite development server
# "--host" allows access from outside the container
# Without it, the app may run but won't be reachable in your browser
CMD ["npm", "run", "dev", "--", "--host"]