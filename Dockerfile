FROM node:alpine

# Import build
ADD ./.prebuild/ /app/

# Switch to /app folder
WORKDIR /app

# Production mode
ENV NODE_ENV=production

# Run
CMD [ "/bin/sh", "-c", "./node_modules/.bin/next start -p ${PORT:-3000}" ]
