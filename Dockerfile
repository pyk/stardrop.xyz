FROM node:20.3.1

RUN apt update
RUN corepack enable
RUN corepack prepare pnpm@8.6.5 --activate

COPY . /app/
WORKDIR /app

RUN pnpm install
RUN pnpm run build

ENV PORT 3000
ENV TZ UTC
ENV NODE_ENV production

EXPOSE 3000
