FROM node:18-alpine3.17 AS build
WORKDIR /usr/src/app
COPY . .
RUN npm ci
RUN npm run build

FROM build AS release
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/package-lock.json ./
COPY --from=build /usr/src/app/package.json ./
COPY --from=build /usr/src/app/prisma ./
RUN npm ci --omit=dev
RUN npx prisma generate

EXPOSE 80
EXPOSE 443
CMD [ "npm", "start" ]
