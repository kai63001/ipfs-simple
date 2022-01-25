import { create } from 'ipfs-http-client'
import express from 'express';
const ipfs = create({host:'ipfs.infura.io',port:5001,protocol:'https'})
const app = express();

app.use(express.json());

app.get('/', (req:any, res:any) => {
    return res.send('Welcome to my IPFS app');
});

app.get('/upload-text', async (req:any, res:any) => {
    const data = req.body;
    console.log(data);
    const fileHash = await addFile(data);
    return res.send(`https://ipfs.infura.io/${ fileHash }`);
});

const addFile = async ({ path, content }:any) => {
    const file = { path: 'path', content: Buffer.from('Hello on IPFS') };
    const filesAdded:any = await ipfs.add(file);
    console.log(filesAdded)
    return filesAdded.cid;
}

app.get('/upload-image',async (req:any,res:any)=>{
    
})

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
