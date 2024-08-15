import { crawlPage } from "./crawl.js";
import { printReport } from "./report.js";

async function main() {
    if (process.argv.length < 3) {
        console.log('No arguments provided. 1 required.');
    } else if (process.argv.length > 3) {
        console.log(`${process.argv.length - 2} arguments given. Only 1 required.`);
    } else {
        const baseURL = process.argv[2];
        console.log(`Crawler starting at: ${baseURL}`);
        const pages = await crawlPage(baseURL)
        printReport(pages)
    }
}

main();
