# Coffee break app

[design](https://dribbble.com/shots/10759517-Pomodoro-timer)

## how to run Docker

0. compile Javascript
```
npm run compile
```
```
yarn compile
```

1. compile docker image
```
docker build -t cbrkim .
```

2. run docker image
```
docker run -e UPDATE_DB=true -d -p 80:80 cbrkim
```

3. stop and remove
```
docker stop <hash>
docker rm <hash>
```
