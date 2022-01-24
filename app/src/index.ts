import Koa, {Context} from 'koa'
import path from 'path'
import koaStatic from 'koa-static'
import koaBody from 'koa-body';
import Router, { url } from 'koa-router';
import fs from 'fs';

const app = new Koa();
const router = new Router();
app.use(koaBody({
    multipart:true,                 // support file upload
    encoding:'gzip',                // html encoding
    formidable:{                    // using formidable options
      keepExtensions: true,         // keep file suffix
      maxFileSize: 200*1024*1024    // default max file size
    }
  }));
  

// Get
router.get('/', async (ctx: any) => {
    ctx.type = 'html';
    const pathUrl = path.join(__dirname, '/static/upload.html');
    ctx.body = fs.createReadStream(pathUrl);
});   


// Post: upload
const uploadUrl = "http://localhost:3000/static/upload"
router.post('/upload',koaBody(), (ctx: any) => {    // cannot use Context object as types of ctx, becuase ctx.request.files method is extended by the koa-body package.
    const file = ctx.request.files.file; 
    console.log(file);
    const fileReader = fs.createReadStream(file.path);
    console.log(fileReader);
    const filePath = path.join(__dirname, '/static/upload/');
    const fileResource = filePath + `/${file.name}`;
    
    const writeStream = fs.createWriteStream(fileResource);

    if (!fs.existsSync(filePath)) {
        fs.mkdir(filePath, (err) => {
            if (err) {
                throw new Error(err.toString());
            } else {
                fileReader.pipe(writeStream);
                ctx.body = { 
                    url: uploadUrl + `/${file.name}`,
                    code: 0,
                    message: "Upload successful."
                };
            }
        });
    } else {
        fileReader.pipe(writeStream);
        ctx.body = {
            url: uploadUrl + `/${file.name}`,
            code: 0,
            message: "Upload successful."
        };
    }
});

app.use(koaStatic(path.join(__dirname)));


app.use(router.routes());
app.use(router.allowedMethods());


app.listen(3000);

