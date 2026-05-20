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
    const labelHtml = label ? `<label ${id ? `for="${id}"` : ''} style="display: block; margin-bottom: var(--space-1); color: var(--color-text-dim); font-size: 0.85rem;">${label}</label>` : '';

    const optionsHtml = options.map(opt => `
        <option value="${opt.value}" ${selected === opt.value ? 'selected' : ''}>${opt.label}</option>
    `).join('');

    return `
        <div class="nb-dropdown-container ${extraClasses}" style="width: 100%;">
            ${labelHtml}
            <select 
                ${idAttr}
                class="nb-focus-ring"
                style="width: 100%; padding: var(--space-2) var(--space-3); background: var(--color-bg-card); border: 1px solid var(--color-border); border-radius: 0.5rem; color: var(--color-text-primary); outline: none; appearance: none; background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2394A3B8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E'); background-repeat: no-repeat; background-position: right 0.7rem top 50%; background-size: 1rem auto; transition: border-color 0.2s;"
            >
                ${optionsHtml}
            </select>
        </div>
    `.trim();
}
