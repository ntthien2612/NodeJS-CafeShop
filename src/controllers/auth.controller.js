// import bd
import db from "../models/index";
import { getUserRoles } from "../services/auth.service"
// connect table in database
const Role = db.tables.roles;
const User = db.tables.users;
const users_roles = db.tables.users_roles;
// jwt and bcrypt
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"

import { ConfigAuth } from "../config/auth.config"

// thư viện OP thực hiện query
const Op = db.Sequelize.Op;

// dang ky
const signup = async (req, res) => {
    // Save User to Database
    try {
        // create User
        const user = await User.create({
            user_name: req.body.user_name,
            email: req.body.email,
            pass_word: bcrypt.hashSync(req.body.pass_word, 8),
            phone: req.body.phone,
        });

        if (req.body.roles) {
            // find role User
            const roles = await Role.findAll({
                where: {
                    role_name: {
                        [Op.or]: req.body.roles,
                    },
                },
            });

            // create obj user_roles add role for User
            const add_user_roles = roles.map((role) => ({
                users_id: user.id,
                roles_id: role.id,
            }));
            // create nhieu record
            await users_roles.bulkCreate(add_user_roles);
            return res.send({ message: "User registered successfully!" });

        } else {
            return res.send({ message: "User registered erorr!" });
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

// update user
const signUpdate = async (req, res) => {
    // Update user
    try {
        const UserId = req.params.UserIdUpdate;
        const UserUpdate = req.body;
        // update User
        const user = await User.findByPk(UserId);
        if (user) {
            await user.update({
                user_name: UserUpdate.user_name || user.user_name,
                email: UserUpdate.email || user.email,
                pass_word: bcrypt.hashSync(UserUpdate.pass_word, 8) || user.pass_word,
                phone: UserUpdate.phone || user.phone,
            })
        }

        if (UserUpdate.roles) {
            const RoleUserUpdate = await users_roles.findAll({
                where: { users_id: UserId }
            })

            for (let item of RoleUserUpdate) {
                await item.destroy();
            }
            // find role User
            const roles = await Role.findAll({
                where: {
                    role_name: {
                        [Op.or]: UserUpdate.roles,
                    },
                },
            });

            // create obj user_roles add role for User
            const add_user_roles = roles.map((role) => ({
                users_id: UserId,
                roles_id: role.id,
            }));

            // create nhieu record
            await users_roles.bulkCreate(add_user_roles);
        }

        return res.send({ message: "User Update successfully!" });

    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

const signin = async (req, res) => {
    try {
        // check user name
        const user = await User.findOne({
            where: {
                user_name: req.body.user_name,
            },
        });

        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }

        // check password
        const passwordIsValid = bcrypt.compareSync(
            req.body.pass_word,
            user.pass_word
        );
        // check pass
        if (!passwordIsValid) {
            return res.status(401).send({
                message: "Invalid Password!",
            });
        }
        // add token
        const token = jwt.sign({ id: user.id },
            ConfigAuth.secretKey,
            {
                algorithm: 'HS256',
                allowInsecureKeySizes: true,
                expiresIn: 86400, // 24 hours
            });

        var authorities = [];
        // find user_roles
        const roles = await getUserRoles(user);
        // get name role
        for (let item of roles) {
            authorities.push("ROLE_" + item.role_name);
        }

        req.session.token = token;

        return res.status(200).send({
            id: user.id,
            user_name: user.user_name,
            email: user.email,
            roles: authorities,
            token: token,
        });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};


const signout = async (req, res) => {
    try {
        req.session = null;
        return res.status(200).send({
            message: "You've been signed out!"
        });
    } catch (err) {
        this.next(err);
    }
};

const authController = {
    signup,
    signin,
    signout,
    signUpdate

};

export { authController };