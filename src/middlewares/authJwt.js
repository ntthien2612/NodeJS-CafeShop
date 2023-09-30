import jwt from "jsonwebtoken";
import { ConfigAuth } from "../config/auth.config"
import db from "../models/index";
import { getUserRoles } from "../services/auth.service"
import { constan } from '../const/constan';


const User = db.tables.users;

// verifyToken
const verifyToken = (req, res, next) => {
    var token = req.headers['access-token'];
    if (!token) {
        return res.status(403).send({
            message: "No token provided!",
        });
    }
    jwt.verify(token,
        ConfigAuth.secretKey,
        (err, decoded) => {
            if (err) {
                return res.status(401).send({
                    message: "Unauthorized!",
                });
            }
            req.userId = decoded.id;
            next();
        });
};
// check role Admin
const isAdmin = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.userId);

        const roles = await getUserRoles(user);

        for (let item of roles) {
            if (item.role_name === constan.ROLES.admin) {
                return next();
            }
        }

        return res.status(403).send({
            message: "Require Admin Role!",
        });
    } catch (error) {
        return res.status(500).send({
            message: "Unable to validate User role!",
        });
    }
};
// check role Order
const isOrder = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.userId);
        const roles = getUserRoles(user);
        for (let item of roles) {
            if (item.role_name === constan.ROLES.order) {
                return next();
            }
        }
        return res.status(403).send({
            message: "Require Order Role!",
        });
    } catch (error) {
        return res.status(500).send({
            message: "Unable to validate User role!",
        });
    }
};

// check role Bartender
const isBartender = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.userId);

        const roles = getUserRoles(user);

        for (let item of roles) {
            if (item.role_name === constan.ROLES.bartender) {
                return next();
            }
        }
        return res.status(403).send({
            message: "Require Bartender Role!",
        });
    } catch (error) {
        return res.status(500).send({
            message: "Unable to validate User role!",
        });
    }
};

const authJwt = {
    verifyToken,
    isAdmin,
    isOrder,
    isBartender,
};

export { authJwt }

