export default pathParams;

const PARAM = /:\w+(?=\W?)/g;

/**
 * 
 * @param   {string} pattern    '/calendar/:year/:month/:date'
 * @param   {string} pathname   '/calendar/2018/7/8'
 * @returns {Object}            { path: '/calendar/2018/7/8', year: '2018', month: '7', date: '8' }
 */
function pathParams(pattern, pathname = location.pathname) {
    const params = ['path'];
    const result = {};
    const regexp = pattern.replace(
        PARAM,
        ([syntax_ignored, ...paramName]) => (
            params.push(paramName.join('')),
            '(\\w+)'
        )
    );
    (new RegExp(regexp).exec(pathname) || [])
        .forEach((match, index) =>
            result[params[index]] = match
        );
    return result;
}
