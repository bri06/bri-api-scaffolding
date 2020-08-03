module.exports = {
  api: {
    port: process.env.API_PORT || 3000,
    swaggerOptions: {
        info: {
          version: '1.0.0',
          title: 'BRI06 API scaffolding',
          license: {
            name: 'MIT',
          },
        },
        filesPattern: './**/*.js',
        baseDir: __dirname,
    },
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'notasecret!',
  }
};