export function convertlinksToUrl(link, parameters) {
    let url = link;
    Object.entries(parameters).forEach(([key, value]) => {
        url = url.replace(`:${key}`, value);
    });
    return url;
}
