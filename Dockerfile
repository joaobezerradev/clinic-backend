# Use Node.js 18 with Debian (Buster or Slim variant for smaller image size)
FROM node:20-buster-slim AS build

# Install OpenSSL
RUN apt-get update -y && apt-get install -y openssl && apt-get install git -y

# Create a dedicated folder for the app and set it as the working directory
WORKDIR /usr/src/app

# Copy application files
COPY . .

# Install dependencies
RUN npm ci

# Build the application
RUN npm run build

# Move to the release stage
FROM build AS release

# Install OpenSSL (again for the release stage)
RUN apt-get update -y && apt-get install -y openssl && apt-get install git -y

# Set the work directory
WORKDIR /usr/src/app

RUN npm i -g npm@latest

# Copy necessary files from the previous stage

COPY --from=build /usr/src/app/package.json ./
COPY --from=build /usr/src/app/package-lock.json ./
COPY --from=build /usr/src/app/prisma ./
COPY --from=build /usr/src/app/dist ./dist

# Install production-only dependencies
RUN npm ci --omit=dev

# Generate Prisma client
RUN npx prisma generate

# Switch to a non-root user
USER node

# Expose necessary ports
EXPOSE 80
EXPOSE 443

# Command to run the application
CMD [ "npm", "start" ]
