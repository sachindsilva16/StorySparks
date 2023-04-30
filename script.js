const lodash = require('lodash');



const postTitle = "sachin-ronson";

const title = "Sachin Ronson";

let postTitleCase = lodash.lowerCase(postTitle);

let titleCase = lodash.kebabCase(title);


console.log("postTitleCase :" + postTitleCase);
console.log("titleCase :" + titleCase);
