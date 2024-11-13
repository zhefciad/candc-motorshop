module.exports = ({ env }) => ({
  email: {
    config: {
      provider: "nodemailer",
      providerOptions: {
        service: "gmail",
        auth: {
          user: "rulesroz@gmail.com",
          pass: "pyaz yzsu gvcz wzng",
        },
      },
      settings: {
        defaultFrom: "rulesroz@gmail.com",
        defaultReplyTo: "rulesroz@gmail.com",
      },
    },
  },
});
