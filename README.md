# Currency Converter API

A minimal, well-tested NestJS application that fetches real-time currency conversion quotes using CoinMarketCap's API.

## Features

- Clean architecture (controllers, services, DTOs, and validation layers)
- Comprehensive DTO validation using `class-validator`
- Custom validation logic for business rules
- Clear error handling with tailored messages
- Unit tests for controller, service, DTOs, and custom validators
- Dockerized for easy deployment

## Tech Stack

- **NestJS** – Backend framework
- **Axios** – For HTTP requests
- **class-validator** – DTO and input validation
- **Jest** – Unit testing
- **Docker** – Containerization

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/yairnagar/currency-converter-api.git
cd currency-converter-api
npm install
```

## Running the App

```bash
npm run start
```

## Running Tests

```bash
npm run test
```

## Docker

To build and run the app using Docker:

```bash
docker build -t currency-converter-api .
docker run -p 3000:3000 --env-file .env currency-converter-api
```

## API Endpoint

`POST /quote`

**Body Parameters**:

- `base_amount`: number (required, must be > 0)
- `base_currency`: string (required, uppercase only, length 3–10)
- `quote_currency`: string (required, uppercase only, length 3–10)

**Example**:

```json
{
  "base_amount": 2,
  "base_currency": "BTC",
  "quote_currency": "USD"
}
```

## Error Handling

- Validation errors return descriptive messages
- CoinMarketCap errors are caught and translated to user-friendly messages
- Handles both 400 and 401 from the external API gracefully

## Structure & Validation Strategy

- Basic validation (existence, type, not empty) is done via DTO decorators
- Business logic validation (e.g., same currency check) is done in a custom validator
- Error handling logic is abstracted to a reusable function

## License

This project is not licensed for public distribution. For demonstration purposes only.
