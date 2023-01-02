# Coffee break app

[design](https://dribbble.com/shots/10759517-Pomodoro-timer)

## how to run Docker

1. compile docker image
```
docker build --build-arg EMAIL=mike.oxmaul.spam@gmail.com -t coffee-break-image .
```

2. run docker image (mount `./sqlite/` to access db)
```
docker run --name coffee-break -d -v sqlite:/sqlite -p 80:80 coffee-break-image
```

3. stop and remove
```
docker stop <hash>
docker rm <hash>
```
