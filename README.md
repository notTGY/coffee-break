# Coffee break app

[design](https://dribbble.com/shots/10759517-Pomodoro-timer)

## how to run Docker

1. compile docker image
```
docker build -t cbrk-image .
```

2. run docker image (mount `./sqlite/` to access db)
```
docker run -e UPDATE_DB=true -e EMAIL=mike.oxmaul.spam@gmail.com -d -v sqlite:/sqlite -p 80:80 -p 443:443 cbrk-image
```

3. stop and remove
```
docker stop <hash>
docker rm <hash>
```
