# koa-study-file-upload
Koa study - uploading no less than 10 MB file to the server

## Run
Running the server by the command below:
```
npm start
```
## Directory structure
```
app
 |- dist
 |  |- static 
 |  |  |- upload
 |  |  |  |- // store the uploaded files
 |  |  |- upload.html
 |  |- index.js
 |- src
 |  |- index.ts
 |- node_modules
 package.json
 tsconfig.json

```

## Result
- check http://localhost:3000/ for the uploading function
- the uploaded file will be stored at `app/dist/static/upload`

