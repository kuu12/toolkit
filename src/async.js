const delay = time =>
    new Promise(resolve =>
        setTimeout(resolve, time));

const limit = (promise, time) =>
    new Promise((resolve, reject) => {
        promise.then(resolve);
        setTimeout(reject, time);
    });
/**
 * 1. Compare **setTimeout** to **loop**
 * ------------ setTimeout ---------------
 * let n = 0;
 * const func = () => {
 *     n++;
 *     if(n < 1000) setTimeout(func);
 * };
 * ------------- loop --------------
 * let n = 0;
 * const stop = loop(next => {
 *     n++;
 *     if(n < 1000) next();
 * });
 * if(0.5 > Math.random()) {
 *     console.log('stop on the outside');
 *     stop();
 * }
 *
 *
 * 2. Use **requestAnimationFrame**
 * loop(next => {
 *     console.log(Date.now());
 *     next();
 * }, requestAnimationFrame);
 *
 *
 * 3. Specific interval
 * loop(
 *     next => {
 *         console.log(new Date().getSeconds());
 *         next();
 *     },
 *     func => setTimeout(func, 1000),
 * );
 *
 * @param {Function} func
 * @param {Function} api
 * @returns {Function}
 *
 */
const loop = (func, api = setTimeout) => {
    if (!(func instanceof Function))
        throw new TypeError('The first argument should be a function');

    if (typeof api === 'number') {
        const interval = api;
        api = f => setTimeout(f, interval);
    }
    else if (!(api instanceof Function))
        throw new TypeError('The second argument should be a function');

    const exec = () => func(next);
    const next = () => api(exec);
    exec();

    return stop;

    function stop(endup = new Function()) {
        if (!(endup instanceof Function))
            throw new TypeError('The argument should be empty or a function');

        func = endup;
    };
};

export { delay, limit, loop };
