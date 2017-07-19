module.exports = {
  apps: [{
    name: 'vidBase',
    script: 'npm start'
  }],
  deploy: {
    production: {
      user: 'ubuntu',
      host: 'ec2-13-59-176-149.us-east-2.compute.amazonaws.com',
      key: '~/.ssh/aws-ec2.pem',
      ref: 'origin/master',
      repo: 'https://github.com/vperis/vidBase.git',
      path: '/home/ubuntu/vidBase',
      'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js'
    }
  }
}

