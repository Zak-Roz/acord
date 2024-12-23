FROM node:18

WORKDIR /main
COPY . /main
RUN npm i
EXPOSE 3000

CMD ["npm", "run", "dev"]
