/**
 * Standardized Card component for the Nebula Design System.
 * 
 * @param {Object} props
 * @param {string} props.title - Card title.
 * @param {string} props.content - Card body content (HTML string).
 * @param {string} [props.image] - URL for a card top image.
 * @param {string} [props.footer] - HTML string for card footer.
 * @param {string} [props.extraClasses] - Additional CSS classes.
 * @returns {string} HTML string.
 */
export function renderCard({ 
    title, 
    content, 
    image = null, 
    footer = null, 
    extraClasses = '',
    onClick = ''
}) {
    const onClickAttr = onClick ? `onclick="${onClick}"` : '';

    return `
        <div class="nb-card nb-hover-elevate ${extraClasses}" ${onClickAttr}>
            ${image ? `<div class="nb-card-image" style="background-image: url('${image}')"></div>` : ''}
            <div class="nb-card-header">
                <h3 class="nb-card-title">${title}</h3>
            </div>
            <div class="nb-card-body">
                ${content}
            </div>
            ${footer ? `
                <div class="nb-card-footer">
                    ${footer}
                </div>
            ` : ''}
        </div>
    `.trim();
}
