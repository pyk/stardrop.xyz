FROM node:20.3.1

ARG NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID
ARG SIWE_SESSION_SECRET
ARG NFT_STORAGE_API_KEY
ARG DATABASE_URL
ARG CREATOR_ADDRESS
ARG CREATOR_SECRET

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
