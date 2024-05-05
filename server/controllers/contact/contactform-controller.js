// const pool = require("../../db");
// const { contactFormQuery, getContactFormListQuery } = require("../../queries/Contact/contactQuery");


// // ****************************
// //   List of all Contact form Controller
// // ****************************
// const allContactFormList = async (req, res, next) => {
//     try {
//         const allContactData = await pool.query(getContactFormListQuery);
//         // console.log("data",allContactData)
//         if (allContactData.rows.length > 0) {
//             return res.status(200).json({ message: 'Contact Form Data',data: allContactData.rows });
//         }
//         else {
//             return res.status(200).json({ message: 'No contact Form Data Found', data:[] });
//         }
//     }
//     catch (error) {
//         next(error)
//     }
// }

// // ****************************
// //   Contact form Controller
// // ****************************
// const contactform = async (req, res, next) => {
//     try {
//         let { username, email, message} = req.body;
//         const addContactData = await pool.query(contactFormQuery, [username, email, message]);
       
//         if (addContactData.rowCount == 1) {
//             return res.status(200).json({ message: 'Message Sent Successfully' });
//         }
//         else {
//             return res.status(200).json({ message: 'Internal server error' });
//         }

//     } catch (error) {
//         // console.log(error);
//         next(error)
//     }
// };




// module.exports = { contactform, allContactFormList}