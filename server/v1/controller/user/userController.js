const {
  BadRequestError,
  Unauthorized,
  NotFoundError,
  InternalServerError,
} = require("../../../error/customError");
const { User } = require("../../../model/user/userModel");
const appStatus = require("../../../utils/appStatus");
const { generateToken } = require("../../../utils/token");
const { tryCatch } = require("../../../utils/tryCatch");
const cookie = require("cookie");
const jwt = require("jsonwebtoken");
//?### sign-up ####
const signUp = tryCatch(async (req, res, next) => {
  const user = req.body;

  const newUser = new User(user);

  const saveUser = await newUser.save();
  req.user = saveUser;
  if (!saveUser) {
    return next(new BadRequestError("Try Again"));
  }

  return next();
});

//?### login ####
const login = tryCatch(async (req, res, next) => {
  const { email, password } = req.body;
 
  if (!email || !password) {
    return next(new BadRequestError("Please provide your credentials"));
  }

  const user = await User.findOne({ email: email });

  if (!user) {
    return next(new NotFoundError("No user found. Please create an account"));
  }
 
  const isPasswordValid = await user.comparePassword(password, user.password);

  if (!isPasswordValid) {
    return next(new Unauthorized("No user found. Please create an account"));
  }
  
  if (!user.isVerified) {
    req.user = user;
    return next();
  }

  const getToken = generateToken(user);

  const jwtCookieOptions = {
    httpOnly: true, // Make the cookie accessible only through HTTP
    secure: true, // Set to 'true' in a production environment with HTTPS
    // sameSite: 'strict', // Set a reasonable same-site policy
    maxAge: 1 * 24 * 60 * 60 * 1000, // Expiration time in milliseconds (1 week)
    domain: process.env.CLIENT_URL,
  };

  const jwtCookie = cookie.serialize(
    "loginSession",
    getToken,
    jwtCookieOptions
  );

  res.setHeader("Set-Cookie", jwtCookie);
  if (process.env.NODE_ENV === "production") {
    res.cookie("loginSession", getToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      domain: process.env.CLIENT_URL,
      path: "login",
    });
  } else {
    res.cookie("loginSession", getToken, { httpOnly: true });
  }
  user.isActive = true;
  user.confirm_pass = password;
  await user.save();
  return appStatus(200, { user, getToken }, req, res, next);
});
//?### log-out###
const logout = tryCatch(async (req, res, next) => {
  const _id = req.params._id;

  const executeUser = await User.findByIdAndUpdate(
    _id,
    {
      $set: { isActive: false },
    },
    { new: true }
  );
  if (!executeUser) {
    return next(new NotFoundError("User Not Exist"));
  }

  return appStatus(204, "", req, res, next);
});
//?#### verifyEmail ###
const verifyUser = tryCatch(async (req, res, next) => {
  const userId = req.params.verificationToken;
  const verifyUser = await User.findOneAndUpdate(
    { _id: userId },
    { isVerified: true },
    { new: true }
  );
  res.redirect(`${process.env.CLIENT_URL}/login`);
  return;
  // appStatus(204, `Verified`, req, res, next);
});

//?# password reset api ###
const resetPasswordRequest = async (req, res, next, user = null) => {
  try {
    const { email } = req.body;

    const ifExist = user || (await User.findOne({ email }));
    if (!ifExist) {
      return next(new NotFoundError("User Not Found"));
    }

    const setToken = generateToken(ifExist, "10m");

    const updateUserToken = await User.findByIdAndUpdate(
      ifExist._id,
      { $set: { token: setToken } },
      { new: true }
    );
    req.token = updateUserToken.token;
    next();
  } catch (error) {
    return next(new InternalServerError(`${error.message}`));
  }
};

const setNewPassword = tryCatch(async (req, res, next) => {
  const token = req.params.token;

  const getUser = await User.findOne({ token });
  if (!getUser) {
    return next(new NotFoundError("Link Already Usesd"));
  }

  const newPassword = getUser.createHashedPassword(req.body.password);

  const updatePassword = await User.findOneAndUpdate(
    { token },
    {
      token: "",
      password: newPassword,
    },
    {
      new: true,
    }
  );

  if (!updatePassword) {
    return next(new BadRequestError("Password did not update"));
  }
  return appStatus(204, "", req, res, next);
});
//? ### end reset api ###

//?### loginSession ####

const loginSession = tryCatch(async (req, res, next) => {
  const { token } = req?.params;
;
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (decoded) appStatus(200, decoded, req, res, next);
  } catch (error) {
    console.log(error.name);
    if (error.name === "TokenExpiredError") {
      return res.status(403).send(`/login`);
    } else {
      throw error;
    }
  }
});

//?### single  user find ###
const singleUser = tryCatch(async (req, res, next) => {
  const _id = req.params._id;

  const ifUser = await User.findById(_id);

  if (!ifUser) {
    return next(new NotFoundError("User Not Exist"));
  }
  return appStatus(200, ifUser, req, res, next);
});

//?### search  users  ###
const allUser = tryCatch(async (req, res, next) => {
  const { query, order_list, page, limit } = req.query;
  const options = {
    page: parseInt(page) || 1,
    limit: parseInt(limit) || 10,
  };

  let search = {};
  let getAll;

  // Handle search query
  if (query) {
    const regexQuery = new RegExp(query, "i");
    search = {
      $or: [
        { email: { $regex: regexQuery } },
        { phone: { $regex: regexQuery } },
        { last_name: { $regex: regexQuery } },
        { first_name: { $regex: regexQuery } },
        { role: { $regex: regexQuery } },
      ],
    };
  }

  // Paginate the search results
  getAll = await User.paginate(search, options);

  if (getAll.docs.length === 0) {
    return next(new NotFoundError("No user"));
  }

  // Filter based on order_list
  if (order_list !== undefined) {
    let arr = [];
    if (order_list === ">") {
      arr = getAll.docs.filter((user) => user.order_list.length >= 5);
    }
    if (order_list === "<") {
      arr = getAll.docs.filter(
        (user) => user.order_list.length < 5 && user.order_list.length > 0
      );
    }
    if (order_list === "0") {
      arr = getAll.docs.filter((user) => user.order_list.length === 0);
    }
    res.locals.data = arr;
  } else {
    res.locals.data = getAll.docs;
  }

  res.locals.pagination = {
    totalDocs: getAll.totalDocs,
    limit: getAll.limit,
    totalPages: getAll.totalPages,
    page: getAll.page,
    pagingCounter: getAll.pagingCounter,
    hasPrevPage: getAll.hasPrevPage,
    hasNextPage: getAll.hasNextPage,
    prevPage: getAll.prevPage,
    nextPage: getAll.nextPage,
  };

  next();
});

//?### single delete user###
const deleteUser = tryCatch(async (req, res, next) => {
  const _id = req.params._id;

  const executeUser = await User.findByIdAndDelete(_id);
  if (!executeUser) {
    return next(new NotFoundError("User Not Exist"));
  }

  return appStatus(204, "", req, res, next);
});

// update user
const updateUser = tryCatch(async (req, res, next) => {
  const { _id } = req.params;
  const { address, phone } = req.body;

  // Find the user by ID
  const user = await User.findById(_id);
  if (!user) {
    return next(new NotFoundError("User Not Exist"));
  }

  // Update the user's details
  const updatedUser = await User.findByIdAndUpdate(
    _id,
    { address: address, phone: phone  , },
    { new: true }
  );

  if (!updatedUser) {
    return next(new NotFoundError("Update Failed"));
  }

  // Send a success status with no content
  appStatus(204, updatedUser, req, res, next);
});

//?### many user delete ###
const deleteMAnyUser = tryCatch(async (req, res, next) => {
  const { idList } = req.body;

  let arr = [];
  for (const _id of idList) {
    const executeUser = await User.findByIdAndDelete(_id);
    if (!executeUser) {
      return next(new NotFoundError("User Not Exist"));
    }
    arr.push(executeUser.name);
  }
  return appStatus(204, `${arr} Deleted`, req, res, next);
});

//?### update role ###
const roleUpdate = tryCatch(async (req, res, next) => {
  const { _id, role } = req.params;

  const roleUp = await User.findByIdAndUpdate(
    _id,
    { role: role },
    { new: true }
  );

  if (!roleUp) {
    return next(new BadRequestError("Failed to Update"));
  }

  appStatus(204, "", req, res, next);
});

module.exports = {
  signUp,
  login,
  logout,
  verifyUser,
  resetPasswordRequest,
  setNewPassword,
  loginSession,
  singleUser,
  allUser,
  deleteUser,
  deleteMAnyUser,
  roleUpdate,
  updateUser,
};
