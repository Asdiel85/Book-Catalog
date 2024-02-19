const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('../lib/jwt');
const { SECRET } = require('../config/config');

exports.register = async (userData) => {
  const user = await User.findOne({ email: userData.email });

  if (!user) {
    await User.create(userData);
  } else {
    
    throw new Error('User already exists');
  }
};

exports.login = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('Invalid username or password');
  }
  
  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    throw new Error('Invalid username or password');
  }

  const payload = {
    _id: user._id,
    email: user.email,
  };

 
  const token = await jwt.sign(payload, SECRET, { expiresIn: '2d' });

  return token;
};

exports.getUsers = () => {
  const result = User.find();
  return result;
}

exports.getById = (userId) => User.findById(userId);

exports.updateUser = async (userId, data) => {
 const user = await User.findByIdAndUpdate(userId, data, {runValidators:true, new: true})
 await Post.updateMany({owner: user._id}, {$set: {userAvatar: user.userAvatar}})
 return await user.save()
}

exports.deleteUser = async (userId) => {
 await Post.deleteMany({owner: userId})
 await User.findByIdAndDelete(userId)
}