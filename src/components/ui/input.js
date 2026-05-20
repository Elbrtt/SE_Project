/**
 * Standardized Input component for the Nebula Design System.
 * 
 * @param {Object} props
 * @param {string} [props.type='text'] - Input type.
 * @param {string} [props.placeholder=''] - Input placeholder.
 * @param {string} [props.value=''] - Initial value.
 * @param {string} [props.id=''] - Element ID.
 * @param {string} [props.label=null] - Optional label text.
 * @param {string} [props.extraClasses=''] - Additional CSS classes.
 * @returns {string} HTML string.
 */
export function renderInput({ 
    type = 'text', 
    placeholder = '', 
    value = '', 
    id = '', 
    label = null,
    extraClasses = ''
}) {
    const idAttr = id ? `id="${id}"` : '';
    const labelHtml = label ? `<label ${id ? `for="${id}"` : ''} class="nb-form-label">${label}</label>` : '';

    return `
        <div class="nb-input-container ${extraClasses}">
            ${labelHtml}
            <input 
                ${idAttr}
                type="${type}" 
                placeholder="${placeholder}" 
                value="${value}"
                class="nb-input nb-focus-ring"
            />
        </div>
    `.trim();
}
