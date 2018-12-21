const delay = time =>
    new Promise(resolve =>
        setTimeout(resolve, time));

const limit = (promise, time) =>
    new Promise((resolve, reject) => {
        promise.then(resolve);
        setTimeout(reject, time);
    });
/**
 *
 * @param {Function} func
 * @param {Function} api
 * @returns {Function}
 *
 * 1. Compare **setTimeout** to **loop**
 * ---------------------------
 * let n = 0;
 * const func = () => {
 *     n++;
 *     if(n < 1000) setTimeout(func);
 * };
 * ---------------------------
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
 * 2. Use **requestAnimationFrame**
 * loop(next => {
 *     console.log(Date.now());
 *     next();
 * }, requestAnimationFrame);
 *
 * 3. Specific interval
 * loop(
 *     next => {
 *         console.log(new Date().getSeconds());
 *         next();
 *     },
 *     func => setTimeout(func, 1000),
 * );
 */
const loop = (func, api = setTimeout) => {
    const exec = () => func(next);
    const next = () => api(exec);
    const stop = endup => func = endup || new Function();
    exec();
    return stop;
};

export { delay, limit, loop };
