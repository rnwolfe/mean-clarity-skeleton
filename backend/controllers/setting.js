const crypt = require('../lib/crypt');

const Setting = require("../models/setting");

exports.getExampleSettings = (req, res, next) => {
  Setting.findOne({ type: 'Example' })
    .then(settings => {
      if (typeof (settings) !== 'undefined') {
        settings.settings.id = settings._id;
        const cipherPassword = settings.settings.password;
        const clearPassword = crypt.decrypt(cipherPassword);
        settings.settings.password = clearPassword;
        res.status(200).json({
          message: 'Example settings fetched successfully!',
          settings: settings.settings
        });
      } else {
        res.status(404).json({ message: 'Example settings not found!' });
      }
    }).catch(error => {
      res.status(500).json({
        message: 'Failed to get Example settings! Error: ' + error
      })
    });
}

exports.updateExampleSettings = (req, res, next) => {
  const password = crypt.encrypt(req.body.password);
  const settings = new Setting({
    _id: req.body.id,
    type: 'Example',
    settings: {
      server: req.body.server,
      port: req.body.port,
      username: req.body.username,
      password: password
    }
  });
  Setting.count({ type: 'Example' }).then(count => {
    if (count > 0) {
      Setting
        .update({ type: 'Example', _id: settings._id }, settings)
        .then(result => {
          if (result) {
            res.status(200).json({ message: 'Example Settings updated successully!' });
          } else {
            res.status(401).json({ message: 'Failed to update Example settings!' });
          }
        })
        .catch(error => {
          res.status(500).json({
            message: 'Failed to update Example settings!' + error
          })
        });
    } else {
      settings
        .save({ type: 'Example' })
        .then(result => {
          if (result) {
            res.status(200).json({ message: 'Example settings created successully!' });
          } else {
            res.status(401).json({ message: 'Failed to create Example settings!' });
          }
        })
        .catch(error => {
          res.status(500).json({
            message: 'Failed to create Example settings!'
          })
        });
    }
  })
}

exports.deleteExampleSettings = (req, res, next) => {
  Setting.deleteOne({ type: 'Example' })
  .then(result => {
    if (result.n > 0) {
      res.status(200).json({ message: 'Example settings deleted!' });
    } else {
      res.status(401).json({ message: 'Failed to delete Example settings!' });
    }
  }).catch(error => {
    res.status(500).json({
      message: 'Failed to delete Example settings!'
    })
  });
}
