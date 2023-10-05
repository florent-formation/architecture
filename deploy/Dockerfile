FROM alpine:edge as builder

RUN apk update && apk upgrade --no-cache && \
    apk --no-cache add npm nodejs

WORKDIR /var/run/app
COPY --chown=nobody:nobody . /var/run/app
RUN npm install


FROM alpine:edge as runner
RUN apk update && apk upgrade --no-cache && \
    apk --no-cache add nodejs
RUN chown nobody:nobody /usr/bin/node
USER nobody:nobody
WORKDIR /var/run/app
COPY --from=builder /var/run/app /var/run/app

HEALTHCHECK --interval=10s --retries=3 --timeout=5s --start-period=5s CMD [ "wget","-q","-O","-", "http://localhost:3000/" ]
EXPOSE 3000
ENTRYPOINT [ "node" ]
CMD [ "monolith/index.js" ]