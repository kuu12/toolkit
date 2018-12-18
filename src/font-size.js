export default createFontSize;

/**
 * Create a series of font size styles.
 * For example, execute in console:
 *      createFontSize([320, 375, 411, 667, 750], [42.6666, 100], 5);
 *
 * Outputs:
 *      "@media (min-width: 320.0000px) { html { font-size: 42.6666px; } }
 *      @media (min-width: 375.0000px) { html { font-size: 49.9999px; } }
 *      @media (min-width: 406.0000px) { html { font-size: 54.1333px; } }
 *      @media (min-width: 411.0000px) { html { font-size: 54.7999px; } }
 *      @media (min-width: 492.0000px) { html { font-size: 65.6000px; } }
 *      @media (min-width: 578.0000px) { html { font-size: 77.0666px; } }
 *      @media (min-width: 664.0000px) { html { font-size: 88.5333px; } }
 *      @media (min-width: 667.0000px) { html { font-size: 88.9333px; } }
 *      @media (min-width: 750.0000px) { html { font-size: 100.0000px; } }"
 *
 * @param       {Array}         screens         An array that contains at least 2 element.
 *                                              The head element is the lower boundary of screen size that
 *                                              you would like to match, and the last element is the upper boundary.
 *                                              Also, you can specific some familiar screen sizes, telling this function
 *                                              these screens need to be specific exact font sizes.
 *
 * @param       {Array}         fontSizes       An array that contains 2 element. The first is minimum font size,
 *                                              the second is maximal font size.
 *
 * @param       {number = 20}   divide          Between the minimum screen and maximal screen, how many screen that
 *                                              you want to automatically create and specific a adaptive font size.
 *
 * @return      {string}                        Styles. Copy and paste them into your project.
 */

function createFontSize(
    screens,
    [fontSizeLower, fontSizeUpper],
    divide = 20,
) {
    const screenLower = screens[0];
    const screenUpper = screens[screens.length - 1];

    const calcScreen = (ignored, index) =>
        screenLower +
        (screenUpper - screenLower) *
        (index / divide);

    const calcFontSize = screen =>
        fontSizeLower +
        (fontSizeUpper - fontSizeLower) *
        (screen - screenLower) /
        (screenUpper - screenLower);

    return Array
        .from(
            new Set(
                Array(divide + 1)
                    .fill(undefined)
                    .map(calcScreen)
                    .concat(screens)
            )
        )
        .sort((a, b) => a - b)
        .map(screen => [
            screen,
            calcFontSize(screen),
        ])
        .map(([screen, fontSize]) => [
            screen.toFixed(4),
            fontSize.toFixed(4),
        ])
        .map(([screen, fontSize]) =>
            `@media (min-width: ${screen
            }px) { html { font-size: ${fontSize}px; } }`
        )
        .join('\n');
}
