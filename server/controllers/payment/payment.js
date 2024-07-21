const axios = require('axios');
const sha256 = require("sha256");
const crypto = require('crypto');

const HOST_URL = process.env.PHONEPE_HOST_URL;
const MERCHANT_ID = process.env.PHONEPE_MERCHANT_ID;
const SALT_INDEX = process.env.PHONEPE_SALT_INDEX;
const SALT_KEY = process.env.PHONEPE_SALT_KEY;

const MAX_RETRIES = 5; // maximum number of retries

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const paymentController = async (req, res) => {
    try {
        const { userid, name, amount, number, MID, transactionid } = req.body;

        // const productUrl = "https://api.phonepe.com/apis/hermes/pg/v1/pay";
        const payeEndPoint = `/pg/v1/pay`;

        const payload = {
            "merchantId": MERCHANT_ID,
            "merchantTransactionId": transactionid,
            "name": name,
            "amount": +amount * 100,
            "redirectUrl": `http://localhost:8080/status?id=${transactionid}`,
            "redirectMode": "POST",
            "mobileNumber": number,
            "paymentInstrument": {
                "type": "PAY_PAGE"
            }
        }

        const bufferObj = Buffer.from(JSON.stringify(payload), "utf8");
        const base64EncodedPayload = bufferObj.toString("base64");
        const hashString = base64EncodedPayload + payeEndPoint + SALT_KEY;
        const hash = crypto.createHash('sha256').update(hashString).digest('hex');
        const xVerify = `${hash}###${SALT_INDEX}`;
        // const xVerify = sha256(base64EncodedPayload + payeEndPoint + SALT_KEY) + "###" + SALT_INDEX;


        // const options = {
        //     method: 'post',
        //     url: `${HOST_URL}${payeEndPoint}`,
        //     headers: {
        //         accept: 'text/plain',
        //         'Content-Type': 'application/json',
        //         'X-VERIFY': xVerify,
        //         'X-MERCHANT-ID': MERCHANT_ID
        //     },
        //     data: {
        //         request: base64EncodedPayload
        //     }
        // };

        const options = {
            method: 'POST',
            url: `${HOST_URL}${payeEndPoint}`,
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
                'X-VERIFY': xVerify,
                // 'X-MERCHANT-ID': MERCHANT_ID
            },
            data: {
                request: base64EncodedPayload
            }
        };

        const response = await axios.request(options);
        if (response) {
            console.log(response.data);
            res.status(200).send(response.data);
        } else {

        }
        console.log(response.data);
        res.status(200).send(response.data);
    } catch (error) {
        console.log("Error in payment controller", error);
        res.status(500).send({ message: "Internal server error" });
    }
}


module.exports = {
    paymentController,
};