/**
 * Standardized Button component for the Nebula Design System.
 * 
 * @param {Object} props
 * @param {string} props.label - Button text.
 * @param {'primary' | 'secondary' | 'ghost' | 'danger'} [props.variant='primary'] - Button style variant.
 * @param {string} [props.icon] - HTML string for an icon.
 * @param {string} [props.onClick] - JavaScript string for the onclick attribute.
 * @param {string} [props.id] - Element ID.
 * @param {string} [props.extraClasses] - Additional CSS classes.
 * @returns {string} HTML string.
 */
export function renderButton({ 
    label, 
    variant = 'primary', 
    icon = null, 
    onClick = '', 
    id = '',
    extraClasses = '' 
}) {
    const variantClasses = {
        primary: 'nb-btn-primary',
        secondary: 'nb-btn-secondary',
        ghost: 'nb-btn-ghost',
        danger: 'nb-btn-danger'
    };

    const variantClass = variantClasses[variant] || 'nb-btn-primary';
    const idAttr = id ? `id="${id}"` : '';
    const onClickAttr = onClick ? `onclick="${onClick}"` : '';
    
    return `
        <button 
            ${idAttr}
            class="nb-btn nb-hover-elevate nb-focus-ring ${variantClass} ${extraClasses}"
            ${onClickAttr}
        >
            ${icon ? `<span class="nb-btn-icon">${icon}</span>` : ''}
            <span class="nb-btn-label">${label}</span>
        </button>
    `.trim();
}
