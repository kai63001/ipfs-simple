import { create } from "ipfs-http-client";
import express from "express";
import path from "path";
import fileUpload from 'express-fileupload'
const ipfs = create({ host: "ipfs.infura.io", port: 5001, protocol: "https" });
const app = express();

app.use(express.json());
app.use(fileUpload());
app.use(express.urlencoded({extended: true}));

app.get("/", (req: any, res: any) => {
  return res.send("Welcome to my IPFS app");
});

app.get("/upload-text", async (req: any, res: any) => {
  const data = req.body;
  console.log(data);
  const fileHash = await addFile(data);
  return res.send(`https://ipfs.infura.io/${fileHash}`);
});

const addFile = async ({ path, content }: any) => {
  const file = { path: path, content: content };
  const filesAdded: any = await ipfs.add(file);
  console.log(filesAdded);
  return filesAdded.cid;
};

app.get("/upload-image", async (req: any, res: any) => {
  res.sendFile(path.join(__dirname, "../publish/index.html"));
});

app.post("/upload-image", async (req: any, res: any) => {
    try {
        if(!req.files) {
            console.log(req.files)
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
            let avatar = req.files.image;
            
            console.log(avatar)
            const fileHash = await addFile({path:'/',content: avatar.data});
            //send response
            res.send({
                status: true,
                message: 'File is uploaded',
                data: {
                    name: avatar.name,
                    mimetype: avatar.mimetype,
                    size: avatar.size,
                    file: `https://ipfs.infura.io/ipfs/${fileHash}`
                }
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
