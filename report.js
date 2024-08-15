function printReport(pages) {
    console.log('Report starting...');
    const pagesArr = sortPages(pages)
    for (const [url, count] of pagesArr) {
        console.log(`Found ${count} internal links to ${url}`)
    }
}

function sortPages(pages) {
    const pagesArr = Object.entries(pages);
    pagesArr.sort((a, b) => b[1] - a[1]);
    return pagesArr
}

export { printReport, sortPages }