module.exports = {
  apps: [
    {
      name: `bukudio-worker`,
      // exec_mode: 'cluster',
      //instances: 'max',
      script: 'npm',
      args: 'run start',
    },
  ],
}
