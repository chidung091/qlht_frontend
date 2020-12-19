# Build docker
## Đứng tại máy local (PC)
```
Bước 1: npm install
Bước 2: npm run build
Bước 3: docker build -t docker.myitsol.com:80/smas-frontend:latest .
Bước 4: docker push docker.myitsol.com:80/smas-frontend:latest 
```

## SSH vào server
```
Bước 1: docker pull docker.myitsol.com:80/smas-frontend:latest 
Bước 2: docker run -d -p 4200:4200 docker.myitsol.com:80/smas-frontend:latest
```
