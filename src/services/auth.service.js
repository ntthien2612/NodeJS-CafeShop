// import bd
import db from "../models/index";
const Role = db.tables.roles;
const users_roles = db.tables.users_roles;

const Op = db.Sequelize.Op;
// Sử dụng async/await để lấy danh sách vai trò của người dùng
async function getUserRoles(user) {
    try {

        var userRole = [];
        // find user_roles
        const roles = await users_roles.findAll({
            where: {
                users_id: user.id,
            }
        });

        // get name role
        for (let item of roles) {
            const role = await Role.findByPk(item.roles_id);
            userRole.push(role);
        }

        return userRole;

    } catch (error) {
        console.error('Lỗi khi lấy danh sách vai trò của người dùng:', error);
    } 
}

export { getUserRoles };