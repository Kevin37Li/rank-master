# Dockerfile for backend

# Use the official Python image as the base image
FROM python:3.10

# Set the working directory
WORKDIR /app/backend

# Copy Pipfile and Pipfile.lock
COPY Pipfile* ./

# Install pipenv
RUN pip install pipenv

# Install the dependencies using pipenv
RUN pipenv install --system --deploy

# Copy the rest of the application code
COPY . .

# Expose the port that the app runs on
EXPOSE 8000

# Start the application
CMD ["pipenv", "run", "python", "manage.py", "runserver"]

