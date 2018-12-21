const script = (url, shouldRemove = false, attributes = {}) =>
    new Promise((resolve, reject) => {
        const dom = document.createElement('script');
        dom.type = 'text/javascript';
        // 可额外设置dom属性
        Object.keys(attributes).forEach(key =>
            dom.setAttribute(key, attributes[key]));
        {
            const remove = callback => (...args) => (
                dom.onload = null,
                dom.onerror = null,
                shouldRemove && setTimeout(() =>
                    document.body.removeChild(dom)),
                callback(...args)
            );
            dom.onload = remove(resolve);
            dom.onerror = remove(reject);
        }
        dom.src = url;
        document.body.appendChild(dom);
    });

const jsonp = url => new Promise((resolve, reject) => {
    const key = `jsonpCallback${String(Math.random()).slice(2)}`;
    const src = `${url}${/\?/.test(url) ? '&' : '?'}callback=${key}`;
    window[key] = data => (delete window[key], resolve(data));
    script(src, true).catch(reject);
});

export { script, jsonp };
