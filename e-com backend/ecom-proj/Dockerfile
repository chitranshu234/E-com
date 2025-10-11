# Use an official OpenJDK 17 runtime as a parent image
FROM openjdk:17-slim

# Set the working directory in the container
WORKDIR /app

# Copy the Maven wrapper and project definition
COPY .mvn/ .mvn
COPY mvnw pom.xml ./

# ----> ADD THIS LINE <----
# Grant execute permission to the mvnw script
RUN chmod +x ./mvnw

# Download dependencies to speed up subsequent builds
RUN ./mvnw dependency:go-offline

# Copy the rest of the application's source code
COPY src ./src

# Package the application and skip running tests
RUN ./mvnw package -DskipTests

# Expose the port the app runs on (Spring Boot's default is 8080)
EXPOSE 8080

# Command to run the executable JAR
ENTRYPOINT ["java", "-jar", "target/shopsphere-0.0.1-SNAPSHOT.jar"]
