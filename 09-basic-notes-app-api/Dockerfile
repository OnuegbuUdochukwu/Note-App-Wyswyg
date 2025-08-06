# Stage 1: Build the application JAR
FROM maven:3.9.6-eclipse-temurin-17 AS builder

# Set the working directory in the container
WORKDIR /app

# Copy the Maven project files to the container
# Copy pom.xml first to leverage Docker's layer caching.
# Dependencies are downloaded only when pom.xml changes.
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy the source code
COPY src ./src

# Package the application, skipping tests
RUN mvn package -DskipTests

# Stage 2: Create the final, lean production image
FROM eclipse-temurin:17-jre-alpine

# Set the working directory
WORKDIR /app

# Define an argument for the JAR file path
ARG JAR_FILE=/app/target/basic-notes-app-api-*.jar

# Copy the JAR from the builder stage
COPY --from=builder ${JAR_FILE} app.jar

# Expose the port the application runs on
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]