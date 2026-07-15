import './Productcard.css'

const itemName = (item) => (typeof item === 'string' ? item : item.name)
const itemTag = (item) => (typeof item === 'string' ? null : item.tag)

/**
 * Product category card.
 * Photo-first: the image fills the top with the category name overlaid
 * on a dark gradient. Items render as pill chips (with their pack-size
 * tag inline), so every card is compact and scannable instead of a
 * long divider list.
 */
function ProductCard({ title, items = [], image }) {
    return (
        <article className="pcard">
            <div className="pcard-media">
                {image && (
                    <img src={image} alt={title} loading="lazy" decoding="async" />
                )}
                <div className="pcard-media-overlay" />
                <div className="pcard-heading">
                    <h3 className="pcard-title">{title}</h3>
                    <span className="pcard-count">
                        {items.length} {items.length === 1 ? 'variety' : 'varieties'}
                    </span>
                </div>
            </div>

            <div className="pcard-body">
                {items.map((item) => {
                    const name = itemName(item)
                    const tag = itemTag(item)
                    return (
                        <span className="pcard-chip" key={name}>
                            {name}
                            {tag && <em className="pcard-chip-tag">{tag}</em>}
                        </span>
                    )
                })}
            </div>
        </article>
    )
}

export default ProductCard