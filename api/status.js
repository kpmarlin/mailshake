const mailshake = require('mailshake-node')('88630d73-e2c4-485f-8d1a-4c778bfc0411');

module.exports = (db) => {
  return {
    checkStatus: async (req, res, next) => {
      try {
        let recipients = [], sentEmails = [], loop = true;
        let parameters = {campaignID: 79347};

        // Get paginated recipients.
        while(loop) {
          const recipientCollection = await mailshake.recipients.list(parameters);

          recipients.push(...recipientCollection.results);
          
          if (recipientCollection.nextToken) {
            parameters.nextToken = recipientCollection.nextToken;
          } else {
            delete parameters.nextToken;
            loop = false;
          }
        }

        loop = true;

        // Get paginated sent emails.
        while(loop) {
          const sentEmailConnection = await mailshake.activity.sent(parameters);

          sentEmails.push(...sentEmailConnection.results);
          if (!sentEmailConnection.nextToken) loop = false;

          if (sentEmailConnection.nextToken) {
            parameters.nextToken = sentEmailConnection.nextToken;
          } else {
            loop = false;
          }
        }

        // Get just the email addresses that had mail sent to them.
        sentEmails = sentEmails.reduce((arr, sent) => {
          arr.push(sent.recipient.emailAddress);
          return arr;
        }, []);

        // Respond with a list of recipient email addresses, and whether or not emails were sent to them yet.
        res.json(recipients.reduce((obj, recipient) => {
          obj[recipient.emailAddress] = sentEmails.includes(recipient.emailAddress);
          return obj;
        }, {}));
      } catch(e) {
        res.status(500).json({message:'An error has occurred. ' + e.message});
      }
    }
  };
}