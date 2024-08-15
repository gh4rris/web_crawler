import { test, expect } from "@jest/globals";
import { normalizeURL, getURLsFromHTML } from "./crawl.js";
import { sortPages } from "./report.js";

test('normalizes https://blog.boot.dev/path/, to blog.boot.dev/path', () => {
    expect(normalizeURL('https://blog.boot.dev/path/')).toEqual('blog.boot.dev/path');
});

test('normalizes https://blog.boot.dev/path, to blog.boot.dev/path', () => {
    expect(normalizeURL('https://blog.boot.dev/path')).toEqual('blog.boot.dev/path');
});

test('normalizes http://BLOG.BOOT.DEV/path/, to blog.boot.dev/path', () => {
    expect(normalizeURL('http://blog.boot.dev/path/')).toEqual('blog.boot.dev/path');
});

test('normalizes http://blog.boot.dev/path, to blog.boot.dev/path', () => {
    expect(normalizeURL('http://blog.boot.dev/path')).toEqual('blog.boot.dev/path');
});

test('absolute', () => {
    expect(getURLsFromHTML('<html><body><a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a></body></html>', 'https://blog.boot.dev')).toEqual(['https://blog.boot.dev/']);
});

test('relative', () => {
    expect(getURLsFromHTML('<html><body><a href="/test/path"><span>Go to Boot.dev</span></a></body></html>', 'https://blog.boot.dev')).toEqual(['https://blog.boot.dev/test/path']);
});

test('both', () => {
    expect(getURLsFromHTML('<html><body><a href="/test/path"><span>Boot.dev></span></a><a href="https://other.com/test/path"><span>Boot.dev></span></a></body></html>', 'https://blog.boot.dev')).toEqual(['https://blog.boot.dev/test/path', 'https://other.com/test/path']);
});

test('sort pages', () => {
    expect(sortPages({a: 7, b: 5, c: 3, d: 9, e: 4, f: 1, g: 3})).toEqual([['d', 9], ['a', 7], ['b', 5], ['e', 4], ['c', 3], ['g', 3], ['f', 1]])
});