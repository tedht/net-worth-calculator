const express      = require("express");
const mysql        = require("mysql2");
const bodyParser   = require("body-parser");
const bcrypt       = require("bcrypt");
const cors         = require("cors");
const cookieParser = require('cookie-parser');
const jwt          = require("jsonwebtoken");

const app = express();
app.use(cookieParser());

const port = 5000;

const connection = mysql.createConnection({
	host: "",
	port: "",
	user: "",
	password: "",
	database: "",
});
  
connection.connect();
console.log("Database is connected");

app.use(bodyParser.json({ type: "application/json" }));
  
app.use(
	cors({
	  origin: ['http://localhost:5174', 'http://localhost:5173'],
	  credentials: true,
	})
);

app.listen(port, () => {
	console.log(`App listening on port ${port}`);
});

/*
const connection = mysql.createConnection({
  host: "server2.bsthun.com",
  port: "6105",
  user: "lab_kjiut",
  password: "w1NptYf2cq2t8PO4",
  database: "lab_blank01_k3zbdu",
});

connection.connect();
console.log("Database is connected");

app.use(bodyParser.json({ type: "application/json" }));

app.use(
  cors({
    origin: ['http://localhost:5174', 'http://localhost:5173'],
    credentials: true,
  })
);

// CREATE ACCOUNT
app.post('/register', async (req, res) => {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const dateofbirth = req.body.dateOfBirth;
  const email = req.body.email;
  const password = req.body.password;

  const salt = await bcrypt.genSalt(10);
  const hashedpassword = await bcrypt.hash(password, salt);

  var sql = mysql.format(
    "INSERT INTO users (firstname, lastname, dateofbirth, email, password, hashedpassword) VALUES (?, ?, ?, ?, ?, ?)",
    [firstname, lastname, dateofbirth, email, password, hashedpassword]
  );

  connection.query(sql, (err, rows) => {
		if (err) {
			return res.json({
				success: false,
				data: null,
				error: err.message,
			});
		}
		res.json({
			success: true,
			message: "User has been created",
		});
  });
});

// LOGIN
app.post('/login', async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  var sql = mysql.format(
		"SELECT * FROM users WHERE email = ?",
		[email]
	);

  connection.query(sql, async (err, rows) => {
		if(err){
			return res.json({
				success: false,
				data: null,
				error: err.message
			});
		} 
		numRows = rows.length;		
		if(numRows == 0){
			res.json({
				success: false,
				message: "User not found",
			});
		} else {
			const authenticated = await bcrypt.compare(password, rows[0].hashedpassword);
			if(authenticated){

        const token = jwt.sign(
					{
						userId: rows[0].id,
					},
					"ZJGX1QL7ri6BGJWj3t"
				);;
        res.cookie('UserToken', token);

				res.json({
					success: true,
					message: "User authentification is successful",
					user: {
            id: rows[0].id,
            firstname: rows[0].firstname,
            lastname: rows[0].lastname,
            dateofbirth: rows[0].dateofbirth,
            email: rows[0].email
          },
				});
			} else {
				res.json({
					success: false,
					message: "Incorrect password",
				});
			}
		}
	});
});

// GET USER
app.get('/me', (req, res) => {

  const token = req.cookies.UserToken;
  var decoded = jwt.verify(token, "ZJGX1QL7ri6BGJWj3t");

  var sql = mysql.format(
		"SELECT * FROM users WHERE id = ?",
		[decoded.userId]
	);

  connection.query(sql, (err, rows) => {
		if (err) {
			res.json({
				success: false,
				data: null,
				error: err.message,
			});
		} else {
			if (rows[0]) {
				res.json({
					success: true,
					data: {
            id: rows[0].id,
            firstname: rows[0].firstname,
            lastname: rows[0].lastname,
            dateofbirth: rows[0].dateofbirth,
            email: rows[0].email
          },
					error: null,
				});
			} else {
				res.json({
					success: true,
					data: null,
					error: null,
				});
			}
		}
	});
});

// GET ENTRIES
app.get('/entries', (req, res) => {
  const token = req.cookies.UserToken;
	var decoded = jwt.verify(token, "ZJGX1QL7ri6BGJWj3t");

  var sql = mysql.format(
    "SELECT * FROM entries WHERE userid = ?", 
    [decoded.userId]
  );

	connection.query(sql, (err, rows) => {
		if (err) {
			res.json({
				success: false,
				data: null,
				error: err.message,
			});
		} else {
			return res.json({
				success: true,
				data: rows,
				error: null,
			});
		}
	});
});

// EDIT ENTRY
app.patch('/entry', (req, res) => {
  const payload = req.body;
  const token = req.cookies.UserToken;
	var decoded = jwt.verify(token, "ZJGX1QL7ri6BGJWj3t");

  var sql = mysql.format(
    "UPDATE entries SET name = ?, value = ?, category = ? WHERE id = ?", 
    [payload.name, payload.value, payload.category, payload.id]
  )

	connection.query(sql, (err, rows) => {
      if (err) {
        res.json({
          success: false,
          data: null,
          error: err.message,
        });
      } else {
        if (rows) {
          res.json({
            success: true,
            data: {
              message: "Updated entry successfully",
              data: payload,
            }
          });
        }
      }
    }
  );
});

// ADD ENTRY
app.post('/entry', (req, res) => {
  const payload = req.body;

  var sql = mysql.format(
    'INSERT INTO entries (name, value, label, category, userid) VALUES (?, ?, ?, ?, ?)',
    [payload.name, payload.value, payload.label, payload.category, payload.userid]
  )

	connection.query(sql, (err, rows) => {
			if (err) {
				res.json({
					success: false,
					data: null,
					error: err.message,
				});
			} else {
				if (rows) {
					res.json({
						success: true,
						data: {
							message: "Created entry successfully",
						},
					});
				}
			}
		}
	);
});

// DELETE ENTRY
app.delete('/entry', (req, res) => {
  const token = req.cookies.UserToken;
	var decoded = jwt.verify(token, "ZJGX1QL7ri6BGJWj3t");
  const entryid = req.body.entryid;

  connection.query(
    `DELETE FROM entries where id = ? AND userid = ?`, [entryid, decoded.userId],
    (err, rows) => {
      if (err) {
        res.json({
          success: false,
          data: null,
          error: err.message,
        });
      } else {
        if (rows) {
          res.json({
            success: true,
            data: {
              message: "Delete entry successfully",
            },
          });
        }
      }
    }
  );
});

// SEARCH
app.post('/search', (req, res) => {
  const payload = req.body.data;
  const token = req.cookies.UserToken;
	var decoded = jwt.verify(token, "ZJGX1QL7ri6BGJWj3t");

  // SEARCHBAR
  let sql = "SELECT * FROM entries WHERE userid = "+decoded.userId;
  if(!(payload.search === null || payload.search === 'undefined' || payload.search === '')){
    sql += " AND name LIKE '"+payload.search+"%'"
  }

  // LABELS
  sql += " AND (";
  let temp = "";
  if(payload.checkedAssets){
    temp += "label = 'asset'";
  }
  if(payload.checkedLiabilities){
    if(temp !== "") temp += " OR ";
    temp += "label = 'liability'"; 
  }
  sql += temp;
  sql += ")";

  // CATEGORIES
  sql += " AND (";
  temp = "";
  if(payload.checkedBankAccount){
    if(temp !== "") temp += " OR ";
    temp += "category = 'Bank account'"; 
  }
  if(payload.checkedRealEstate){
    if(temp !== "") temp += " OR ";
    temp += "category = 'Real estate'"; 
  }
  if(payload.checkedCar){
    if(temp !== "") temp += " OR ";
    temp += "category = 'Car'"; 
  }
  if(payload.checkedDebt){
    if(temp !== "") temp += " OR ";
    temp += "category = 'Debt'"; 
  }
  if(payload.checkedLoan){
    if(temp !== "") temp += " OR ";
    temp += "category = 'Loan'"; 
  }
  if(payload.checkedAssetOther || payload.checkedLiabilityOther){
    if(temp !== "") temp += " OR ";
    temp += "category = 'Other'"; 
  }
  sql += temp;
  sql += ")";

  // ORDER
  switch(payload.order){
    case "Alphabetical (a-z)": 
      sql += " ORDER BY name ASC";
      break;
    case "Alphabetical (z-a)": 
      sql += " ORDER BY name DESC";
      break;
    case "Value (ascending)": 
      sql += " ORDER BY value ASC";
      break;
    case "Value (descending)": 
      sql += " ORDER BY value DESC";
      break;
  }

	connection.query(sql, (err, rows) => {
		if (err) {
			res.json({
				success: false,
				data: null,
				error: err.message,
			});
		} else {
			return res.json({
				success: true,
				data: rows,
				error: null,
			});
		}
	});
  

});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});*/