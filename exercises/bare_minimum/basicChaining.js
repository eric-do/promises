/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var git = require('./promisification.js');
var writeFileAsync = Promise.promisify(fs.writeFile);


var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {

  var errorHandler = err => {
    if (err) throw new Error(err);
  }
  
  return git.pluckFirstLineFromFileAsync(readFilePath)
  .then(username => git.getGitHubProfileAsync(username))
  .then(body => writeFileAsync(writeFilePath, JSON.stringify(body)))
  .catch(errorHandler);
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
