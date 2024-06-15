import session from "express-session";
export const sessionConfig = {
  secret: "xTj23hV98uLn4iF56Fg7KlMn2Gh8P9rT",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }, // Set to true if using HTTPS
};

