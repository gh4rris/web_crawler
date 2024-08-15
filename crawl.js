import {JSDOM} from 'jsdom';

function normalizeURL(url) {
    const urlObj = new URL(url);
    let fullPath = `${urlObj.hostname}${urlObj.pathname}`;
    if (fullPath.slice(-1) === '/') {
        fullPath = fullPath.slice(0, -1);
    }
    return fullPath
}

function getURLsFromHTML(htmlBody, baseURL) {
    const dom = new JSDOM(htmlBody);
    const anchorList = dom.window.document.querySelectorAll('a');
    const urls = [];
    for (const anchor of anchorList) {
        if (anchor.hasAttribute('href')) {
            let href = anchor.getAttribute('href');
            try {
                href = new URL(href, baseURL).href;
                urls.push(href);
            } catch(err) {
                console.log(`${err.message}: ${href}`);
            }
        }
    }
    return urls;
}

async function fetchHTML(url) {
    let response;
    try {
        response = await fetch(url);
    } catch(err) {
        throw new Error(`Network error: {${err.message}}`);
    }
        if (response.status >= 400) {
            console.log(`Response status: ${response.status}`);
            return;
        } const contentType = response.headers.get('content-type'); 
        if (!contentType || !contentType.includes('text/html')) {
            console.log(`Invalid content type: ${contentType}`);
            return;
        }
        return response.text();
}

async function crawlPage(baseURL, currentURL=baseURL, pages={}) {
    const base = new URL(baseURL);
    const current = new URL(currentURL);
    if (base.hostname !== current.hostname) {
        return pages;
    } const normalized = normalizeURL(current)
    if (pages[normalized] > 0) {
        pages[normalized] ++;
        return pages;
    }
    pages[normalized] = 1;
    console.log(`crawling ${currentURL}`)
    let html = ''
    try {
        html = await fetchHTML(currentURL);
    } catch(err) {
        console.log(`${err.message}`);
        return pages;
    }
    const nextURLs = getURLsFromHTML(html, baseURL);
    for (const url of nextURLs) {
        pages = await crawlPage(baseURL, url, pages)
    }
    return pages
    
}

export { normalizeURL, getURLsFromHTML, crawlPage };