# Use the official Deno image
FROM denoland/deno:latest

# Set the working directory
WORKDIR /app

# Copy the application files
COPY . .

# Expose the port the app runs on
EXPOSE 8000

# Run the application
CMD ["run", "--allow-net", "main.ts"]