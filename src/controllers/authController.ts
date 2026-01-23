// imports
import {
  type Request,
  type Response,
  type NextFunction
} from "express";

import jwt from "jsonwebtoken";

import bcrypt from "bcrypt";
import Joi, { ValidationResult } from "joi";

// Project imports
import { userModel } from "../models/userModel";
import { User } from "../interfaces/user";
import { connect, disconnect } from '../repository/database';


export async function registerUser(req: Request, res: Response) {

  try {
    // validate the user and password info
    const { error } = validateUserRegistrationInfo(req.body);

    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }

    await connect();

    // check if the email is already registered
    const emailExists = await userModel.findOne({ email: req.body.email });

    if (emailExists) {
      res.status(400).json({ error: "Email already exists." });
      return;
    }

    // hash the password
    const salt = await bcrypt.genSalt(10);
    const passwordHashed = await bcrypt.hash(req.body.password, salt);

    const userObject = new userModel({
      name: req.body.name,
      email: req.body.email,
      password: passwordHashed
    });

    const savedUser = await userObject.save();
    res.status(201).json({ error: null, data: savedUser._id });

  } catch (error) {
    res.status(500).send("Error registrering user. Error: " + error);
  }
  finally {
    await disconnect();
  }
};




export async function loginUser(req: Request, res: Response) {

  try {

    // validate user login info
    const { error } = validateUserLoginInfo(req.body);

    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }

    // find the user in the repository
    await connect();

    const user: User | null = await userModel.findOne({ email: req.body.email });

    if (!user) {
      res.status(400).json({ error: "Password or email is wrong." });
      return;
    }
    else {
      // create auth token and send it back

      const validPassword: boolean = await bcrypt.compare(req.body.password, user.password);

      if (!validPassword) {
        res.status(400).json({ error: "Password or email is wrong." });
        return;
      }

      const userId: string = user.id;
      const token: string = jwt.sign(
        {
          // payload
          name: user.name,
          email: user.email,
          id: userId
        },
        process.env.TOKEN_SECRET as string,
        { expiresIn: '2h' }
      );

      // attach the token and send it back to the client
      res.status(200).header("auth-token", token).json({ error: null, data: { userId, token } });
    }

  } catch (error) {
    res.status(500).send("Error logging in user. Error: " + error);
  }
  finally {
    await disconnect();
  }
};

//Midleware to verify token
export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const token = req.header("auth-token");
  if (!token) return res.status(400).json({ error: "Bad request!" });

  try {
    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET as string);
        next();
    }
  } catch (error) {
    res.status(401).json({ error: "Unauthorized, invalid token!" });
  }
}   






// Validate user registration info
function validateUserRegistrationInfo(user: User): ValidationResult {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required()
  });

  return schema.validate(user);
}

//Validate user login info
function validateUserLoginInfo(user: User): ValidationResult {
  const schema = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required()
  });

  return schema.validate(user);
}