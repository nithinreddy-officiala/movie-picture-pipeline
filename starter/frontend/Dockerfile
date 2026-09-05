FROM public.ecr.aws/docker/library/node:18.14.2-alpine3.17 AS compile

ARG REACT_APP_MOVIE_API_URL
ENV REACT_APP_MOVIE_API_URL=${REACT_APP_MOVIE_API_URL}

WORKDIR /workspace
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM public.ecr.aws/docker/library/node:18.14.2-alpine3.17
WORKDIR /app
RUN npm install --global serve@14.2.0
COPY --from=compile /workspace/build ./build
EXPOSE 3000
CMD ["serve", "-s", "build", "-l", "3000"]
