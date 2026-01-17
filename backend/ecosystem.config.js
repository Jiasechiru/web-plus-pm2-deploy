require('dotenv').config({ path: '.env.deploy' });

const {
  DEPLOY_USER,
  DEPLOY_HOST,
  DEPLOY_PATH,
  DEPLOY_REPO,
  DEPLOY_REF = 'origin/master',
} = process.env;

module.exports = {
  apps: [{
    name: 'backend',
    script: './dist/app.js',
    instances: 1,
    exec_mode: 'fork',
    env: {
      NODE_ENV: 'production',
    },
  }],

  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: DEPLOY_REPO,
      path: DEPLOY_PATH,
      key: '/Users/jias/.ssh/magassh/private_key',
      'pre-deploy-local': `scp -i /Users/jias/.ssh/magassh/private_key .env ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}`,
      'post-deploy': `
        cd ${DEPLOY_PATH}/current &&
        cp ${DEPLOY_PATH}/shared/.env .env &&
        npm ci &&
        npm run build &&
        pm2 startOrRestart ecosystem.config.js --env production
      `,
    },
  },
};