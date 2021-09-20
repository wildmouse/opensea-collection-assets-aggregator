import {program} from "commander"
import fetch from "node-fetch"

program
    .version("1.0.0")
    .requiredOption("-c --collection <string>", "collection name contains assets");

program.parse(process.argv);

let offset = 0

const options = program.opts();

const collection = options.collection

if (collection === "") {
    throw new Error("collection is empty");
}

while (true) {
    const response = await fetch(`https://api.opensea.io/api/v1/assets?order_direction=desc&offset=${offset}&limit=50&collection=${collection}`)
    const body = await response.json()

    if (body.assets.length === 0) {
        break
    }

    body.assets.forEach(asset => console.log(asset.permalink))

    offset += 50
}
