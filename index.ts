import { create } from 'ipfs-http-client'
import express from 'express';
const ipfs = create({host:'ipfs.infura.io',port:5001,protocol:'https'})
const app = express();


// const test = async () => {
//   const client = create()
//   const { cid } = await client.add('I KUY NUT!!!')
//     console.log(cid)

// };

// test();
app.use(express.json());

app.get('/', (req:any, res:any) => {
    return res.send('Welcome to my IPFS app');
});

app.get('/upload', async (req:any, res:any) => {
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

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
