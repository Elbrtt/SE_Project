/**
 * Standardized Dropdown component for the Nebula Design System.
 * 
 * @param {Object} props
 * @param {Array<{value: string, label: string}>} props.options - List of options.
 * @param {string} [props.selected=null] - Currently selected value.
 * @param {string} [props.id=''] - Element ID.
 * @param {string} [props.label=null] - Optional label text.
 * @param {string} [props.extraClasses=''] - Additional CSS classes.
 * @returns {string} HTML string.
 */
export function renderDropdown({ 
    options, 
    selected = null, 
    id = '', 
    label = null,
    extraClasses = ''
}) {
    const idAttr = id ? `id="${id}"` : '';
    const labelHtml = label ? `<label ${id ? `for="${id}"` : ''} class="nb-form-label">${label}</label>` : '';

    const optionsHtml = options.map(opt => `
        <option value="${opt.value}" ${selected === opt.value ? 'selected' : ''}>${opt.label}</option>
    `).join('');

    return `
        <div class="nb-dropdown-container ${extraClasses}">
            ${labelHtml}
            <select 
                ${idAttr}
                class="nb-dropdown nb-focus-ring"
            >
                ${optionsHtml}
            </select>
        </div>
    `.trim();
}
