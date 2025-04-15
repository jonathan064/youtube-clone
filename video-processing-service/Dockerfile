#Node18 runtime as parent image
FROM node:18

#Set working directory in container to /app
WORKDIR /app

#Copy package.json and package-lock.json into directory
COPY package*.json ./

#Install ffmpeg in container
RUN apt-get update && apt-get install -y ffmpeg

#Install packages needed by package.json
RUN npm install

#COPY app source inside docker image
COPY . .

#Make port 3000 available outside of container
EXPOSE 3000

#Define the command to run app using CMD
CMD ["npm","start"]

