const User = require("../models/user");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req,res) =>{
    try {
        const { name ,email , password } = req.body;
        const user = await User.create({name,email,password})
        const token = jwt.sign({id:user._id} ,process.env.JWT_SECRET,{
            expiresIn:'7d',
        });
        res.status(201).json({token,user});
    } catch (error) {
        res.status(400).json({message:"Registration Failed",error})
    }
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const isMatch = await bcrypt.compare(password, user?.password || '');
    if (!user || !isMatch)
      return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(400).json({ message: 'Login failed', err });
  }
};