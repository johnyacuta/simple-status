# Simple Status API

API for Simple Status Page.

## Requirements

Python 3.6+

## Installation

```bash
pip install -r requirements.txt
```

## Running

```bash
uvicorn app.main:app --reload
```

## Docker

Build the app’s container image:

```bash
docker build -t simple-status-api .
```

Start the app container:

```bash
docker run -dp 8000:8000 simple-status-api
```

## Documenation

Go to `http://127.0.0.1:8000/docs`. You will see the automatic interactive API documentation (provided by Swagger UI).

## Example

Run the server and then open a terminal and copy and paste the below command to test the API.

```bash
curl http://localhost:8000/status
```

Console output:

```bash
$ curl http://localhost:8000/status 
{"Services":[{"name":"Simple Status","url":"http://localhost:8000/healthz","category":"API","status":200}]
```

API logs output:

```bash
INFO      Requested service: name='Simple Status' url='http://localhost:8000/healthz' category='API'
INFO:     127.0.0.1:50599 - "GET /healthz HTTP/1.1" 200 OK
INFO      Service info: name='Simple Status' url='http://localhost:8000/healthz' category='API' status=200
INFO:     127.0.0.1:50597 - "POST /status HTTP/1.1" 200 OK
```

Alternatively, you can also navigate to `http://127.0.0.1:8000/docs` and ecxecute commands there.
