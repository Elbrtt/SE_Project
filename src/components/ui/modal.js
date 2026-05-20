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
        <div id="${id}" class="nb-modal-overlay" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.7); display: flex; align-items: center; justify-content: center; z-index: 1000; backdrop-filter: blur(4px);">
            <div class="nb-modal-container nb-card" style="width: 500px; max-width: 90%; max-height: 80vh; overflow-y: auto; background-color: var(--color-bg-card); border-radius: var(--sys-radius-modal); padding: var(--sys-spacing-lg); border: 1px solid var(--color-border); box-shadow: 0 20px 50px rgba(0,0,0,0.5);">
                <div class="nb-modal-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
                    <h2 class="nb-modal-title" style="margin: 0; font-size: 1.5rem; color: var(--color-text-primary);">${title}</h2>
                    <button class="nb-modal-close" onclick="document.getElementById('${id}').style.display='none'" style="background: transparent; border: none; color: var(--color-text-muted); cursor: pointer; font-size: 1.5rem;">&times;</button>
                </div>
                <div class="nb-modal-body" style="color: var(--color-text-muted); line-height: 1.6;">
                    ${body}
                </div>
                ${footer ? `
                    <div class="nb-modal-footer" style="margin-top: var(--space-4); padding-top: var(--space-4); border-top: 1px solid var(--color-border); display: flex; justify-content: flex-end; gap: var(--space-2);">
                        ${footer}
                    </div>
                ` : ''}
            </div>
        </div>
    `.trim();
}
