const key = process.env.REACT_APP_DOWELLMAIL_API_KEY;

const requests = {
    requestSendEmail: `https://100085.pythonanywhere.com/api/v1/mail/${key}/?type=send-email`,
    requestValidateEmail: `https://100085.pythonanywhere.com/api/v1/mail/${key}/?type=validate`
};

export default requests; 