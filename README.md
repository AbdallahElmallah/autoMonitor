# AutoMonitor

AutoMonitor is a monitoring tool designed to check the status of Kafka and Camunda services. It notifies users via email if any service or Camunda job fails.

## Requirements

- Node.js
- npm
- TypeScript

## Installation

1. Clone the repository:
    - Clone it by:
    ```bash
    git clone https://github.com/AbdallahElmallah/autoMonitor.git
    ```
    - Navigate to the directory by:
    ```bash
    cd automonitor
    ```

2. Install dependencies:
    - To install dependencies, run:
    ```bash
    npm install
    ```

3. Configure the application:
    - Update the API endpoints and other constants in the `constants.ts` file located in `src/constants`.
    - Create a `.env` file in the root directory and add the following environment variables:
        ```
        EMAIL_USER=
        EMAIL_PASSWORD=
        EMAIL_RECEIVER=
        CAMUNDA_USER=
        CAMUNDA_PASSWORD=
        ```

4. To schedule the application to run periodically using cron:
    - Copy the `cronjob` file from the project directory to `/etc/cron.d/`:
        ```bash
        sudo cp cronjob /etc/cron.d/cronjob
        ```
    - Set appropriate permissions for the cronjob file:
        ```bash
        sudo chmod 0644 /etc/cron.d/cronjob
        ```
    - Install the cronjob by running:
        ```bash
        sudo crontab /etc/cron.d/cronjob
        ```

## Usage

To start AutoMonitor, run:

```bash
npm start
```
This command compiles TypeScript files and starts the application.

## Packages
AutoMonitor uses the following packages:

- **axios**: "^1.6.7"
- **dotenv**: "^16.4.5"
- **nodemailer**: "^6.9.11"
- **typescript**: "^5.3.3"

## Customization
- **Email Configuration**: You can configure the email settings by modifying the `serverConfig` property that belongs to `ZohoEmailService` class in `src/services/zohoEmailService.ts`. Customize it to use a different SMTP server and port if needed.

## Dockerization

To dockerize the application, follow these steps:

1. Build the Docker image:

    ```bash
    sudo docker build -t automonitor .
    ```

2. Run the Docker container in detached mode:

    ```bash
    sudo docker run -d --name automonitor automonitor
    ```

This will build the Docker image named `automonitor` and run the container in detached mode with the name `automonitor`.

## Viewing Logs

To view the application logs, follow these steps:

1. Enter the Docker container using the `docker exec` command.

    ```bash
    docker exec -it automonitor /bin/bash
    ```

    This command will open a bash shell within the Docker container.

2. Once inside the container, use the `cat` command to view the contents of the `healthCheck.log` file:

    ```bash
    cat logs/healthCheck.log
    ```

    This command will display the contents of the `healthCheck.log` file located in the `/usr/src/app/logs/` directory within the container.

## License

This project is licensed under the [ISC License](LICENSE).
