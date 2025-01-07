# node image version
FROM node:22-alpine


# Open folder in Docker
WORKDIR /auth-app

# Copy package.json and lock file
COPY package*.json ./

# Install dependencies
RUN pnpm install

# Copy all other files
COPY . .

# Expose the port
EXPOSE 3000

# Command to run the app
CMD ["pnpm", "dev"]
