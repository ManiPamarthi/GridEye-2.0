import express, { Express, Request, Response } from "express";
import * as dotenv from 'dotenv';
let bodyParser = require('body-parser'); 
const app: Express = express();
const cors = require('cors')
const { body, validationResult } = require('express-validator');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true}));  
app.use(bodyParser.json()); 
dotenv.config();
const client = require('./config/esclient');
const port = process.env.PORT;

app.post("/login",body('email').isEmail().normalizeEmail(),body('password'),async(req: Request, res: Response) => {
  const data = await client.search({
    index:'users',
    body: {
      query: {
        bool: {
          must: [{
            match_phrase:{
              email: req.body.email
            }
          },
          {
            match_phrase: {
               password:req.body.password
            }
        }
        ]
        }
      }
    }});
  const errors = validationResult(req);
      if (!errors.isEmpty() || !data.hits.hits.length) {
          return res.status(400).json({
              success: false,
              errors: errors.array()
          });
      }
      res.status(200).json({
          success: true,
          message: 'Login successful',
      })
});

app.post("/create", async (req: Request, res: Response) => {
  // await client.index({
  //   index: 'users',
  //   document: {
  //     email: 'nicholas@utiltyx.com',
  //     password: 'util@123'
  //   }
  // });
})

app.get("/logout", async (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'logout successful',
})
});
// api to get vulnerabilities
app.get('/vulnerabilities', async (req: Request, res: Response) => {
    const result = await client.search({
  index: 'ge_nvd_index',
  size:req.query.size || 10,
  from:req.query.from || 0,
  sort: [
    {
      'published': {
        mode: 'avg',
        order: 'desc',
      }
    }
  ]
  });
  res.status(200).json({
  success: true,
  data: result?.hits.hits,
 })
});
// api to get vulnerabilities
app.get('/vulnerabilities/stats', async (req: Request, res: Response) => {
  const total_cve = await client.count({
    index:'ge_nvd_index'
  });
  const prioritized = await client.count({
    index:'ge_nvd_index',
    body: {
      query: {
        bool: {
          must: [{
            match_phrase:{
              vulnStatus: 'Analyzed'
            }
          },
        ]
        }
      }
    }
  });
  const result = {
    total_cve:total_cve.count,
    prioritized:prioritized.count,
    critical:120,
    confidence:'51%',
  }
  res.status(200).json({
  success: true,
  data: result,
 })
});

// api to add vulnerabilities
app.post('/vulnerabilities', async (req: Request, res: Response) => {
const result = await client.index({
 index: 'vulnerabilities',
 document: req.body,
 });
 res.status(200).json({
  success: true,
  message: 'vulnerabilities added successful',
  data:result,
 });
});

// api to get assets
app.get('/assets', async (req: Request, res: Response) => {
  let payload = {
    index: 'ge_assets',
    size:req.query.size || 10,
    from:req.query.offset || 0,
    } as any;

    if(req.query.filter) {
     const filter = String(req.query.filter).split(":");
      payload['body'] = {
        query: {
          bool: {
            filter: [
              {
                "wildcard":{
                  [filter?.[0]]:"*"+filter?.[1]+"*",
                }
              },
            ]
          }
        }
      }
    };

  const result = await client.search(payload);
  res.status(200).json({
  success: true,
  data: result?.hits.hits,
 })
});


app.patch('/assets', async (req: Request, res: Response) => {
  const {id, updatedData} = req.body;
  const result = await client.update({
    index:'ge_assets',
    id:id,
    doc:updatedData 
  });
  if(result) {
    res.status(200).json({
      success: true,
      data: result,
     }); 
  }
});

// api to add assets
app.post('/assets', async (req: Request, res: Response) => {
const result = await client.index({
 index: 'ge_assets',
 document: req.body,
 });
 res.status(200).json({
  success: true,
  message: 'assets added successful',
  data:result,
 });
});

app.get('/topology', async (req: Request, res: Response) => {
  const result = await client.search({
  index: 'ge_topo_index',
  size:req.body.size || 10,
  from:req.body.count || 0,
  });
  res.status(200).json({
  success: true,
  data: result?.hits.hits,
 })
});

app.listen(port, () => {
  console.log(`now listening on port ${port}`);
});
