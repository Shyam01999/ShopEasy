const axios = require('axios');
const sha256 = require("sha256");
const crypto = require('crypto');

const HOST_URL = process.env.PHONEPE_HOST_URL;
const MERCHANT_ID = process.env.PHONEPE_MERCHANT_ID;
const SALT_INDEX = process.env.PHONEPE_SALT_INDEX;
const SALT_KEY = process.env.PHONEPE_SALT_KEY;

//Production Phone pe URL
// let phonePayHostUrl = "https://api.phonepe.com/apis/hermes"
// let merchantId = "M222PG348OBUS"
// let saltIndex = 1
// let saltKey = "0fd779b2-323b-4edc-af6e-ebcb1469026d"

// UAT Url
// let phonePayHostUrl = "https://api-preprod.phonepe.com/apis/pg-sandbox"
// let merchantId = "PGTESTPAYUAT85"
// let saltIndex = 1
// let saltKey = "88186875-58c6-4313-a000-1e640b3db251"

const paymentController = async (req, res) => {
    try {
        const { userid, name, amount, number, MID, transactionid } = req.body;

        // const productUrl = "https://api.phonepe.com/apis/hermes/pg/v1/pay";
        const payeEndPoint = `/pg/v1/pay`;

        const payload = {
            "merchantId": MERCHANT_ID,
            "merchantTransactionId": transactionid,
            "merchantUserId": MID,
            "name": name,
            "amount": Number(amount) * 100,
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

        axios.request(options)
            .then((response) => {
                console.log(response.data);
                if (response.data.success) {
                    const url = response.data.data?.instrumentResponse?.redirectInfo?.url;
                    res.json({ message: "Payment gateway page", redirectUrl: url });
                }
                else {
                    res.status(500).json({ error: 'Invalid response from payment gateway' });
                }
            })
            .catch((error) => {
                console.log(error);
            })
    } catch (error) {
        console.log("Error in payment controller", error);
        res.status(500).send({ message: "Internal server error" });
    }
}

const checkStatus = async (req, res) => {
    try {
        const merchantTransactionId = res.req.body.transactionid;
        const merchantId = res.req.body.merchantId;
        const statusEndPoint = `/pg/v1/status`;
        const string = `${statusEndPoint}/${merchantId}/${merchantTransactionId}` + SALT_KEY;
        const sha256 = crypto.createHash('sha256').update(string).digest("hex");
        const xVerify = `${sha256}###${SALT_INDEX}`;

        const options = {
            method: 'GET',
            url: `${HOST_URL}${statusEndPoint}/${merchantId}/${merchantTransactionId}`,
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
                'X-VERIFY': xVerify,
                'X-MERCHANT-ID': `${merchantId}`
            }
        };

        //Check payment status
        axios.request(options)
            .then((res) => {
                console.log(res.data);
                if (res.data.status == true) {
                    const url = `http:3000://localhost:3000/frontend/payment/success`;
                    return res.status(200).redirect(response.data);
                }
                else {
                    const url = `http:3000://localhost:3000/frontend/payment/failure`;
                    return res.status(200).redirect(response.data);
                }

            })
            .catch((error) => {
                console.log(error);
            })
    }
    catch (error) {
        console.log(error);
    }
}


module.exports = {
    paymentController,
    checkStatus
};