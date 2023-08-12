const express = require('express')
const cors = require('cors');
const mysql = require('mysql2');

const app = express();

require('dotenv').config();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Mysql#26alen",
    database: "user_db"
});

app.post("/",async(req,res)=>{
    const {uid}=req.body

    const q=`select uid,count(*) as total_candidates,count(IF(s.status = 'joined', 1, NULL)) 'joined',count(IF(s.status = 'interview', 1, NULL)) 'interviewed'  
    from candidate_table c INNER JOIN status_table s on c.cid=s.cid where c.uid=${uid}`

    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listening on PORT : ${PORT}`);
    console.log(`View devoplment server at http://localhost:${PORT}/`);
});