require('dotenv').config();
const accountSid = "AC010b0028f21238f55b9d73887bbc8206";
const authToken = "2fe06ec31fa56adca91d56829e0f54ef";


const client = require('twilio')(accountSid, authToken);

const sendSMS = async (body) => {
    let msgOptions = {
        from: "+18556177511",
        to: "+14702660559",
        body
    };
    try {
        const message = await client.messages.create(msgOptions);
        console.log("success")
    } catch (error) {
        console.error('Error sending SMS:', error);
    }
};

sendSMS("Come to Lunch!");
