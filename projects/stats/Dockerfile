FROM node as build
WORKDIR /app
COPY . /app/
RUN npm install -g @angular/cli 
RUN npm install
RUN ls /app
ARG configuration=production
RUN ng build stats --aot --configuration $configuration
RUN ls /app/dist
# Stage 2, use the compiled app, ready for production with Nginx
FROM nginx
COPY --from=build /app/dist/stats/ /usr/share/nginx/html
COPY /nginx.conf /etc/nginx/conf.d/default.conf