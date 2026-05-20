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
    // This implementation returns a tooltip element that can be injected or used as a template.
    // For a data-tooltip pattern, we often just need the attribute on the parent, 
    // but this component provides the actual tooltip UI if needed.
    
    const positionStyles = {
        top: 'bottom: 100%; left: 50%; transform: translateX(-50%) translateY(-8px);',
        bottom: 'top: 100%; left: 50%; transform: translateX(-50%) translateY(8px);',
        left: 'right: 100%; top: 50%; transform: translateY(-50%) translateX(-8px);',
        right: 'left: 100%; top: 50%; transform: translateY(-50%) translateX(8px);'
    };

    return `
        <div class="nb-tooltip nb-card" data-position="${position}" style="position: absolute; ${positionStyles[position]} padding: var(--space-1) var(--space-2); background: var(--ref-color-neutral-40); color: var(--color-text-primary); font-size: 0.75rem; border-radius: 4px; white-space: nowrap; pointer-events: none; z-index: 1100; box-shadow: 0 4px 10px rgba(0,0,0,0.3); border: 1px solid var(--color-border); opacity: 0; transition: opacity 0.2s;">
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
