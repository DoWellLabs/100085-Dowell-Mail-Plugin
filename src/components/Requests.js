const key = 'fbe95563-2f97-41f2-b1d8-d511227b3b41'

const requests = {
    requestSendEmail: `https://100085.pythonanywhere.com/api/v1/mail/${key}/?type=send-email`,
    requestValidate: `https://100085.pythonanywhere.com/api/v1/mail/${key}/?type=validate`,
    requestFindEmail: `https://100085.pythonanywhere.com/api/v1/mail/${key}/?type=email-finder`
};