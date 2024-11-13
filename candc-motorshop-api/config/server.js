module.exports = ({ env }) => {
  const publicUrl = env("PUBLIC_URL", "http://localhost:1337");

  console.log("PUBLIC_URL:", publicUrl); // This will log the PUBLIC_URL when Strapi starts

  return {
    host: env("HOST", "0.0.0.0"),
    port: env.int("PORT", 1337),
    url: publicUrl,
    app: {
      keys: env.array("APP_KEYS"),
    },
    webhooks: {
      populateRelations: env.bool("WEBHOOKS_POPULATE_RELATIONS", false),
    },
  };
};
