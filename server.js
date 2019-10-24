const express = require('express');
const app = express()
/**
 * Generic Node server with Express to public web files.
 */
app.use(express.static('public'))
app.listen(8080, () => {
    console.log('Server listening on port 8080!');
})