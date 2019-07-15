/**
 * Create a series of font size styles.
 * __For example, execute in console:__
 *
 *     FontSize([320, 375, 411, 667, 750], 1, 20);
 *
 * __Outputs:__
 *
 *     "@media (min-width: 320.0000px) { html { font-size: 0.4267px; } }
 *     @media (min-width: 340.0000px) { html { font-size: 0.4533px; } }
 *     @media (min-width: 360.0000px) { html { font-size: 0.4800px; } }
 *     @media (min-width: 375.0000px) { html { font-size: 0.5000px; } }
 *     @media (min-width: 395.0000px) { html { font-size: 0.5267px; } }
 *     @media (min-width: 411.0000px) { html { font-size: 0.5480px; } }
 *     @media (min-width: 431.0000px) { html { font-size: 0.5747px; } }
 *     @media (min-width: 451.0000px) { html { font-size: 0.6013px; } }
 *     @media (min-width: 471.0000px) { html { font-size: 0.6280px; } }
 *     @media (min-width: 491.0000px) { html { font-size: 0.6547px; } }
 *     @media (min-width: 511.0000px) { html { font-size: 0.6813px; } }
 *     @media (min-width: 531.0000px) { html { font-size: 0.7080px; } }
 *     @media (min-width: 551.0000px) { html { font-size: 0.7347px; } }
 *     @media (min-width: 571.0000px) { html { font-size: 0.7613px; } }
 *     @media (min-width: 591.0000px) { html { font-size: 0.7880px; } }
 *     @media (min-width: 611.0000px) { html { font-size: 0.8147px; } }
 *     @media (min-width: 631.0000px) { html { font-size: 0.8413px; } }
 *     @media (min-width: 651.0000px) { html { font-size: 0.8680px; } }
 *     @media (min-width: 667.0000px) { html { font-size: 0.8893px; } }
 *     @media (min-width: 687.0000px) { html { font-size: 0.9160px; } }
 *     @media (min-width: 707.0000px) { html { font-size: 0.9427px; } }
 *     @media (min-width: 727.0000px) { html { font-size: 0.9693px; } }
 *     @media (min-width: 747.0000px) { html { font-size: 0.9960px; } }
 *     @media (min-width: 750.0000px) { html { font-size: 1.0000px; } }"
 *
 *
 * @param       {Array}         screenList      An array that contains at least 2 element.
 *                                              The head element is the lower boundary of screen size that
 *                                              you would like to match, and the last element is the upper boundary.
 *                                              Also, you can specific some familiar screen sizes, telling this function
 *                                              these screens need to be specific exact font sizes.
 *
 * @param       {number = 1}    sizeOf750px
 *
 * @param       {number = 20}   step
 *
 * @return      {string}                        Styles. Copy and paste them into your project.
 */

const FontSize = (
    screenList = [320, 375, 411, 667, 750],
    sizeOf750px = 1,
    step = 20
) =>
    screenList
        .map((screen, index) => {
            const set = [];
            do {
                set.push(screen);
                screen += step;
            } while (
                index + 1 < screenList.length &&
                screen <= screenList[index + 1]
            );
            return set;
        })
        .reduce((all, set) => [...all, ...set], [])
        .map(screen => [
            screen,
            (screen / 750 * sizeOf750px).toFixed(4),
        ])
        .map(([screen, fontSize]) =>
            `@media (min-width: ${screen
            }px) { html { font-size: ${fontSize}px; } }`
        )
        .join('\n');

export default FontSize;
