# Specify the base image
FROM node:19

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application files
COPY . .

# Expose the port on which your application listens
EXPOSE 4000

# Define the startup command
CMD ["npm", "run", "devStart"]