FROM java:8-jdk-alpine

COPY ./target/divide-0.0.1-SNAPSHOT.jar /usr/app/

WORKDIR /usr/app

RUN sh -c 'touch divide-0.0.1-SNAPSHOT.jar'

ENTRYPOINT ["java","-jar","divide-0.0.1-SNAPSHOT.jar"]