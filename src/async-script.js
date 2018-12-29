const script = (url, removeDom = false, domAttrs) =>
    new Promise((resolve, reject) => {
        const dom = document.createElement('script');
        dom.type = 'text/javascript';

        if (domAttrs) Object
            .keys(domAttrs)
            .forEach(key =>
                dom.setAttribute(key, domAttrs[key])
            );

        const clear = callback => (...args) => {
            dom.onload = null;
            dom.onerror = null;
            callback(...args);
            if (removeDom) document.body.removeChild(dom);
        };
        dom.onload = clear(resolve);
        dom.onerror = clear(reject);
        dom.src = url;
        document.body.appendChild(dom);
    });

const jsonp = url => new Promise((resolve, reject) => {
    const key = `jsonpCallback${String(Math.random()).slice(2)}`;
    const src = `${url}${/\?/.test(url) ? '&' : '?'}callback=${key}`;
    window[key] = data => (
        delete window[key],
        resolve(data)
    );
    script(src, true).catch(error => (
        delete window[key],
        reject(error)
    ));
});

export { script, jsonp };
