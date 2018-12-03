module.exports = {
    apps: [{
      name: "yourteam",
      script: "./app.js",
      watch: true,
      ignore_watch : ["node_modules", "db"],
      exec_mode: "cluster",
      instances: 1,
      env: {
        "NODE_ENV": "development",
      }
    }]
  }