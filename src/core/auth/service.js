const bcrypt = require("bcryptjs");
const User = require("./repository");
const jwt = require("jsonwebtoken");
const config = require("../configs");
const { logger } = require('../logger')

const passwordIsMatch = async (username, password) => {
  try {
    let user = await User.getAuth(username);
    if (!user) {
      return {
        sts: 401,
        user: {
          msg: "Incorrect username or password"
        }
      };
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return {
        sts: 401,
        user: {
          msg: "Incorrect username or password"
        }
      };
    }
    const payload = {
      user: {
        id: user.id
      }
    };
    const token = jwt.sign(payload, config.jwt.secret, {
      expiresIn: "24h" // Expires in 24 hours
    });
    return {
      sts: 200,
      user: { token: "Bearer " + token }
    };
  } catch (err) {
    logger.error(err.message);
    return {
      sts: 500,
      user: {
        msg: "Server Error"
      }
    };
  }
};

const getLoggedIn = async id => {
  try {
    let user = await User.getUser(id);
    return {
      sts: 200,
      user
    };
  } catch (err) {
    logger.error(err.message);
    return {
      sts: 500,
      user: "Server Error"
    };
  }
};

const createNewUser = async (createdId, username, password, name, role) => {
  try {
    let user = await User.getUser(createdId);
    if (user.role !== "admin") {
      return {
        sts: 401,
        user: {
          msg: "To create a user, please contact admin"
        }
      };
    }

    let userExist = await User.checkUsername(username);
    if (userExist) {
      return {
        sts: 400,
        user: {
          msg: "Username already exists"
        }
      };
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const result = await User.createUser(username, hashPassword, name, role);
    return {
      sts: 201,
      user: result
    };
  } catch (err) {
    console.log(err.message);
    return {
      sts: 500,
      user: {
        msg: "Server Error"
      }
    };
  }
};

module.exports = {
  passwordIsMatch,
  getLoggedIn,
  createNewUser
};