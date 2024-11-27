module.exports = {
  apps: [
    {
      name: "api-terrain-de-badminton",
      script: "./bin/www",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
