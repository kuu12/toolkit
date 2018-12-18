export default waybillParser;

function waybillParser(context) {
    const separator = [
        Math.random(),
        Math.random(),
        Math.random(),
    ].join('');

    return (sentinel + context)
        .replace(find_phone, ([not_digit, ...phone]) =>
            not_digit +
            separator +
            phone.join('') +
            separator
        )
        .slice(1)
        .split(separator)
        .map(text => ({
            is_phone: is_phone.test(text),
            text,
        }));
}

const sentinel = '$';
const mobile = '1\\d{10}(?=$|\\D)';
const tele = '(\\d{3,4}-)?\\d{7,8}(?=$|\\D)';
const is_phone = new RegExp(mobile + '|' + tele);
const find_phone = new RegExp('\\D' + mobile + '|' + '\\D' + tele, 'g');
