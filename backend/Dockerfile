# Backend Dockerfile (Spring Boot)
FROM openjdk:17-jdk-slim

WORKDIR /app

# Copy Maven wrapper and pom.xml (if using Maven)
# COPY mvnw .
# COPY .mvn .mvn
# COPY pom.xml .

# Or if using Gradle
# COPY gradlew .
# COPY gradle gradle
# COPY build.gradle .

# Copy application properties
COPY application*.properties ./

# Copy the built JAR file
# Replace 'quickbox-api.jar' with your actual JAR name
COPY target/quickbox-api-*.jar app.jar

# Create uploads directory
RUN mkdir -p /app/uploads

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD curl -f http://localhost:8080/actuator/health || exit 1

# Run the application
ENTRYPOINT ["java", "-jar", "-Dspring.profiles.active=${SPRING_PROFILES_ACTIVE:-prod}", "app.jar"]
