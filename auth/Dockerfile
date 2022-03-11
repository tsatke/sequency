FROM golang:latest as BUILDER

RUN mkdir /app

ADD . /app

WORKDIR /app

RUN go mod download
RUN go build -o auth .

CMD ["/app/auth"]

FROM alpine:latest

COPY --from=BUILDER /app/auth /

ENTRYPOINT [ "/auth" ]