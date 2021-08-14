# PMAN-web-ui

Basic UI for testing the PMAN password manager

# How to Use
To run build the image using the Dockerfile and run it

```bash
docker build -t pmanui .
```

```bash
docker run --name pmanui -p 80:80 -d pmanui
```