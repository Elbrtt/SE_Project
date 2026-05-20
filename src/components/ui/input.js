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
    const labelHtml = label ? `<label ${id ? `for="${id}"` : ''} style="display: block; margin-bottom: var(--space-1); color: var(--color-text-dim); font-size: 0.85rem;">${label}</label>` : '';

    return `
        <div class="nb-input-container ${extraClasses}" style="width: 100%;">
            ${labelHtml}
            <input 
                ${idAttr}
                type="${type}" 
                placeholder="${placeholder}" 
                value="${value}"
                class="nb-focus-ring"
                style="width: 100%; padding: var(--space-2) var(--space-3); background: rgba(255, 255, 255, 0.05); border: 1px solid var(--color-border); border-radius: 0.5rem; color: var(--color-text-primary); outline: none; transition: border-color 0.2s;"
            />
        </div>
    `.trim();
}
