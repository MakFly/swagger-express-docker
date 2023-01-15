FROM node:alpine

WORKDIR /app

# COPY package.json and package-lock.json files
COPY package.json package-lock.json ./

# generated prisma files
COPY prisma ./prisma/

# COPY prisma/.env into ./prisma/
COPY prisma/.env ./prisma/

# COPY tsconfig.json file
COPY tsconfig.json ./

# Install package.json dependencies
RUN npm install -g nodemon
RUN npm install

COPY . /

RUN npx prisma generate

# PORT
EXPOSE 3000

# A command to start the server
CMD [ "npm", "run", "dev" ]