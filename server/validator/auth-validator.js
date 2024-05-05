const { z } = require('zod');

//creating an object schema
const registerSchema = z.object({
    username: z
        .string({ required_error: "Name is required" })
        .trim()
        .min(3, { message: 'Name must be at least of 3 characters.' })
        .max(255, { message: 'Name must not be more than 255 characters' }),
    email: z
        .string({ required_error: "Email is required" })
        .trim()
        .email({ message: "Invalid email address" })
        .min(3, { message: 'Email must be at least of 3 characters.' })
        .max(255, { message: 'Email must not be more than 255 characters' }),
    password: z
        .string({ required_error: "Password is required" })
        .trim()
        .min(6, { message: 'Password must be at least of 6 characters.' })
        .max(100, { message: 'Password must not be more than 100 characters' }),
    mobilenumber: z
        .string({ required_error: "Mobile Number is required" })
        .trim()
        .min(10, { message: 'Mobile Number must be at least of 10 characters.' })
        .max(20, { message: 'Mobile Number must not be more than 20 characters' }),
    // avatar: z
    //     .any(),
    role: z
        .string({ required_error: "" })
        .trim(),
    // resetPasswordToken: z
    //     .string({ required_error: "" }),
    // resetPasswordToken: z
    //     .string({ required_error: "" }),




})

//creating an login object schema
const loginSchema = z.object({
    email: z
        .string({ required_error: "Email is required" })
        .trim()
        .email({ message: "Invalid email address" })
        .min(3, { message: 'Email must be at least of 3 characters.' })
        .max(255, { message: 'Email must not be more than 255 characters' }),
    password: z
        .string({ required_error: "Password is required" })
        .trim()
        .min(6, { message: 'Password must be at least of 6 characters.' })
        .max(100, { message: 'Password must not be more than 100 characters' }),

})
module.exports = { registerSchema, loginSchema };