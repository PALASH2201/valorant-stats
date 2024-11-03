# Backend Dockerfile for Flask
FROM python:3.10-slim 

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file and install dependencies
COPY requirements.txt .
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the backend code
COPY . .

# Expose the port Flask runs on
EXPOSE 5000

# Command to run the Flask application
CMD ["flask", "run", "--host=0.0.0.0", "--port=5000"]
