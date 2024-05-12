const LoginModel  = require('../models/LoginModel')
const jwt = require('jsonwebtoken');
const bcrypt  = require('bcrypt');



class LoginController {


    async checkLoginBymail(req, res) {
        try {
          const { email, password } = req.body; // Extract email and password from the request body
          LoginModel.email = email;
      
          const data = await LoginModel.checkLoginFunction();
          const user = data[0];
      
          bcrypt.compare(password, user.password, async (bcryptErr, match) => {
            if (bcryptErr) {
              console.error('Error comparing passwords:', bcryptErr);
              res.status(500).json({ error: 'Authentication error' });
              return;
            }
            if (password !== user.password) {
              res.status(401).json({ error: 'Invalid credentials' });
              return;
            }
        //    console.log("match ", matchs , "password" ,password, user.password)
            // Successful authentication
            const token = await jwt.sign({ email: user.email }, 'Mojave123', { expiresIn: '1h' });
            res.json({ message: 'Login successful', user: { id: user.id, email: user.email }, token: token });
          });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      }
      

}


module.exports = new LoginController()