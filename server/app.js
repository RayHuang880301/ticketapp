
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
const EncryptRsa = require('encrypt-rsa').default;
const ethers = require('ethers');
const lodash = require('lodash');
dotenv.config();
const PORT = process.env.PORT || 3000;

async function initServer() {
  const RSA = await initRsa();
  const storage = await initStorage();
  const allowedOrigins = [`http://localhost:${PORT}`];
  const corsOptions = {
    origin: allowedOrigins
  };
  const app = express();
  app.use(express.json())
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cors(corsOptions));
  app.use(express.static(__dirname + '/dist')); //Serves resources from public folder
  

  // Routes
  app.get('/api', (_, res) => {
    res.json({
      msg: 'Hello World',
    });
  });
  
  app.post('/api/set-id', (req, res) => {
    const { address, id, nftId } = req.body;
    if(!address || !id || !nftId) {
      return res.status(400).json({
        body: req.body,
        error: 'Missing address, id or nftId',
      });
    }
    const random = ethers.BigNumber.from(ethers.utils.randomBytes(32));
    const addr = address.toLowerCase();
    const account = {
      address: addr,
      identityEncrypted: RSA.encrypt(id),
      identityToken: random.toHexString(),
      nftId: nftId,
      updatedTime: Date.now(),
    };
    storage.set(`accounts.${addr}`, account)
    console.log({
      acc: account,
      decrypt: RSA.decrypt(account.identityEncrypted),
    })
  
    res.json({
      data: account,
    });
  });

  app.post('/api/get-by-token', (req, res) => {
    const { identityToken } = req.body;
    if(!identityToken) {
      return res.status(400).json({
        error: 'Missing identityToken',
      });
    }
    const account = lodash.find(storage.get('accounts'), (acc) => acc.identityToken === identityToken);
    if(!account) {
      return res.status(400).json({
        error: 'Invalid identityToken',
      });
    }

    res.json({
      data: {
        identity: RSA.decrypt(account.identityEncrypted),
        ...account
      },
    });
  });

  app.post('/api/get-by-nftid', (req, res) => {
    const { nftId } = req.body;
    if(!nftId) {
      return res.status(400).json({
        error: 'Missing nftId',
      });
    }
   
    const account = lodash.find(storage.get('accounts'), (acc) => acc.nftId === nftId);
    if(!account) {
      return res.status(400).json({
        error: 'Invalid nftId',
      });
    }

    res.json({
      data: {
        identity: RSA.decrypt(account.identityEncrypted),
        ...account
      },
    });
  });
  
  app.use((_, res, _2) => {
    res.status(404).json({ error: 'NOT FOUND' });
  });
  app.listen(PORT);

  return app;
}

initServer().then(() => {
  console.log(`Server started on port ${PORT}`);
})

async function initRsa() {
  const nodeRSA = new EncryptRsa();
  const pubPath = path.join(__dirname, 'public.key');
  const privPath = path.join(__dirname, 'private.key');
  let publicKey;
  let privateKey;
  if(!fs.existsSync(pubPath) || !fs.existsSync(privPath)) {
    const { privateKey: _privateKey, publicKey: _publicKey } = nodeRSA.createPrivateAndPublicKeys();
    fs.writeFileSync(path.join(__dirname, 'public.key'), publicKey);
    fs.writeFileSync(path.join(__dirname, 'private.key'), privateKey);
    publicKey = _publicKey;
    privateKey = _privateKey;
  } else {
    publicKey = fs.readFileSync(pubPath, 'utf8');
    privateKey = fs.readFileSync(privPath, 'utf8');
  }
  return {
    encrypt: (text) => nodeRSA.encryptStringWithRsaPublicKey({ 
      text: text,   
      publicKey,
    }),
    decrypt: (encryptedText) => nodeRSA.decryptStringWithRsaPrivateKey({
      text: encryptedText,
      privateKey,
    }),
  }
}

async function initStorage() {
  const storagePath = path.resolve(__dirname, 'storage.json');
  const data = {
    updatedTime: Date.now(),
    storage: {}
  }
  if(fs.existsSync(storagePath)) {
    const fileData = JSON.parse(fs.readFileSync(storagePath, 'utf8'));
    data.updatedTime = fileData.updatedTime;
    data.storage = fileData.storage;
  }
  const save = () => {
    fs.writeFileSync(storagePath, JSON.stringify(data));
  }
  return {
    get: (ref) => {
      return lodash.get(data.storage, ref);
    },
    set: (ref, value) => {
      lodash.set(data.storage, ref, value);
      data.updatedTime = Date.now();
      save();
    },
    
  }
}