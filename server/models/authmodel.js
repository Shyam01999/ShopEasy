const crypto = require('crypto');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false, // Assuming email is required
            unique: true, // Assuming email should be unique
            validate: {
                isEmail: {
                    args: true,
                    msg: "Please Enter a valid email"
                }
            }
        },
        mobilenumber: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isNumeric: true, // Validates if the value is numeric
                len: [10, 11] // Validates length between 10 and 11 digits
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        avatar: {
            type: DataTypes.JSON,
            allowNull: false
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        resetPasswordToken: DataTypes.STRING,
        resetPasswordExpire: DataTypes.DATE,

    })

    // Define method to generate reset password token
    User.prototype.getResetPasswordToken = function () {
        // Generate reset token
        const resetToken = crypto.randomBytes(20).toString('hex');

        // Hashing and adding resetPasswordToken to user instance
        this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

        // Setting expiration time
        this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

        // Return the token
        return resetToken;
    };

    return User
}

