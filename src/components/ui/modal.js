/**
 * Standardized Modal component for the Nebula Design System.
 * 
 * @param {Object} props
 * @param {string} props.title - Modal title.
 * @param {string} props.body - Modal body content (HTML string).
 * @param {string} [props.footer] - HTML string for modal footer.
 * @param {string} [props.id='nb-modal'] - Element ID for the modal container.
 * @returns {string} HTML string.
 */
export function renderModal({ 
    title, 
    body, 
    footer = null, 
    id = 'nb-modal' 
}) {
    return `
        <div id="${id}" class="nb-modal-overlay">
            <div class="nb-modal-container nb-card">
                <div class="nb-modal-header">
                    <h2 class="nb-modal-title">${title}</h2>
                    <button class="nb-modal-close" onclick="document.getElementById('${id}').style.display='none'">&times;</button>
                </div>
                <div class="nb-modal-body">
                    ${body}
                </div>
                ${footer ? `
                    <div class="nb-modal-footer">
                        ${footer}
                    </div>
                ` : ''}
            </div>
        </div>
    `.trim();
}
