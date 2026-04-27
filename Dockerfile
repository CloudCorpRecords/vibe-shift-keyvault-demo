FROM nginx:alpine AS production

RUN rm -rf /usr/share/nginx/html/*

COPY index.html /usr/share/nginx/html/index.html
COPY README.md /usr/share/nginx/html/README.md
COPY read.md /usr/share/nginx/html/read.md

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost:80/ || exit 1

EXPOSE 80

USER 1001

WORKDIR /app

CMD ["nginx", "-g", "daemon off;"]
