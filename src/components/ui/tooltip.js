/**
 * Standardized Tooltip component for the Nebula Design System.
 * Note: This component usually works in conjunction with CSS or JS that handles positioning.
 * 
 * @param {Object} props
 * @param {string} props.text - Tooltip text.
 * @param {'top' | 'bottom' | 'left' | 'right'} [props.position='top'] - Tooltip position.
 * @returns {string} HTML string.
 */
export function renderTooltip({ 
    text, 
    position = 'top' 
}) {
    return `
        <div class="nb-tooltip nb-card" data-position="${position}">
            ${text}
        </div>
    `.trim();
}

/**
 * Utility to add tooltip attributes to an element.
 * @param {string} text 
 * @param {string} position 
 * @returns {string} Attribute string.
 */
export function tooltipProps(text, position = 'top') {
    return `data-tooltip="${text}" data-tooltip-position="${position}"`;
}
