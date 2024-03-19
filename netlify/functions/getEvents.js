const Parser = require("rss-parser");
const parser = new Parser();

exports.handler = async function (event, context) {
    const data = await parser.parseURL("https://forums.pokemmo.com/index.php?/forum/36-official-events.xml/&member=440918&key=62f3187f80bafc5b7e856a3227756bdc")

    return {
        statusCode: 200,
        body: JSON.stringify(data),
    };
};
