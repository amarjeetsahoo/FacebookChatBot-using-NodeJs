//Just to test axios

const axios = require('axios').default;
axios.get("https://api.github.com/users/amarjeetsahoo").then((response) => {
    console.log(response.data);
});