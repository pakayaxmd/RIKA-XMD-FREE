FROM node:18

WORKDIR /app

# Clone public repo
RUN apt-get update && apt-get install -y git
RUN git clone https://github.com/pakebijja/RIKA-XMD-v2.git .
RUN npm install

EXPOSE 3000
CMD ["node","index.js"]
