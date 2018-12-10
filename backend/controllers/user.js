const bcrypt = require('bcryptjs');

const User = require('../models/user');

exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        username: req.body.username,
        email: req.body.email,
        name: req.body.name,
        role: req.body.role,
        password: hash
      });
      user
        .save()
        .then(result => {
          res.status(201).json({
            message: 'User created!',
            result: result
          });
        })
        .catch(err => {
          res.status(500).json({
            message: "Invalid request."
          });
        });
    });
}

exports.getUsers = (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const userQuery = User.find();
  let fetchedUsers;
  if (pageSize && currentPage) {
    userQuery
      .skip(pageSize * (currentPage - 1))
      .limit(pageSize);
  }
  userQuery
    .then(documents => {
      fetchedUsers = documents;
      return User.count();
    })
    .then(count => {
      res.status(200).json({
        message: 'Users fetched successfully!',
        users: fetchedUsers,
        maxUsers: count
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Failed to get users!'
      })
    });
}

exports.getUser = (req, res, next) => {
  User.findById(req.params.id).then(user => {
    if (user) {
      res.status(200).json({
        message: 'User fetched successfully!',
        user: user
      });
    } else {
      res.status(404).json({ message: 'User not found!' });
    }
  }).catch(error => {
    res.status(500).json({
      message: 'Failed to get user!'
    })
  });
}

exports.updateUser = (req, res, next) => {
  if (req.body.password) {
    // password was changed
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const user = new User({
          _id: req.body.id,
          username: req.body.username,
          email: req.body.email,
          name: req.body.name,
          role: req.body.role,
          password: hash
        });
        User.update({ _id: req.params.id }, user)
          .then(result => {
            console.log(result);
            if (result.n > 0) {
              res.status(200).json({ message: 'User updated successully with password change!' });
            } else {
              res.status(401).json({ message: 'Not authorized!' });
            }
          })
          .catch(error => {
            res.status(500).json({
              message: 'Failed to update user!'
            })
          });
      });
  } else {
    // password was not changed
    const user = new User({
      _id: req.body.id,
      username: req.body.username,
      email: req.body.email,
      name: req.body.name,
      role: req.body.role
    });
    User.update({ _id: req.params.id }, user)
      .then(result => {
        console.log(result);
        if (result.n > 0) {
          res.status(200).json({ message: 'User updated successully!' });
        } else {
          res.status(401).json({ message: 'Not authorized!' });
        }
      })
      .catch(error => {
        res.status(500).json({
          message: 'Failed to update user! ' + error
        })
      });
  }
}

exports.deleteUser = (req, res, next) => {
  User.deleteOne({ _id: req.params.id })
    .then(result => {
      if (result.n > 0) {
        res.status(200).json({ message: 'User deleted!' });
      } else {
        res.status(401).json({ message: 'Not authorized.' });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: 'Failed to delete user!'
      })
    });
}

