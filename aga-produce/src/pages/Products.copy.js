export const productsCopy = {

    eyebrow: {
        en: 'Montebello, California · Packed to order',
        es: 'Montebello, California · Empacado a pedido',
    },
    titleA: { en: 'Everything', es: 'Todo lo que' },
    titleB: { en: 'we carry.', es: 'manejamos.' },
    badgeCats: {
        en: (n) => `${n} categories`,
        es: (n) => `${n} categorías`,
    },
    badgeItems: {
        en: (n) => `${n} varieties`,
        es: (n) => `${n} variedades`,
    },
    lede: {
        en: "Usually in stock and moving through the building six days a week. Search the list, then call for today's availability and pricing.",
        es: 'Generalmente en existencia y en movimiento seis días a la semana. Busque en la lista y llámenos para disponibilidad y precios de hoy.',
    },

    searchLabel: { en: 'Find it on the list', es: 'Búsquelo en la lista' },
    searchPlaceholder: { en: 'jalapeño, citrus, rice…', es: 'jalapeño, cítricos, arroz…' },
    searchAria: { en: 'Search the product list', es: 'Buscar en la lista de productos' },
    clear: { en: 'Clear', es: 'Borrar' },
    tallyIdle: {
        en: (items, cats) => `${items} items · ${cats} categories`,
        es: (items, cats) => `${items} productos · ${cats} categorías`,
    },
    tallyMatch: {
        en: (shown, total, q) => `${shown} of ${total} items match “${q}”`,
        es: (shown, total, q) => `${shown} de ${total} productos coinciden con “${q}”`,
    },
    varietyOne: { en: 'variety', es: 'variedad' },
    varietyMany: { en: 'varieties', es: 'variedades' },

    emptyKicker: { en: 'Not on the list', es: 'No está en la lista' },
    emptyTitle: {
        en: (q) => `Nothing matches “${q}”.`,
        es: (q) => `Sin resultados para “${q}”.`,
    },
    emptyBody: {
        en: 'We source by request. Call the desk and we will tell you what we can get and when.',
        es: 'Abastecemos por encargo. Llame y le decimos qué podemos conseguir y cuándo.',
    },
    emptyCta: { en: 'Call', es: 'Llame al' },

    notes: [
        {
            k: { en: 'Pack counts', es: 'Conteos' },
            v: {
                en: 'Full cases, specialty counts, or your own label. Tell us the count and we pack to it.',
                es: 'Cajas completas, conteos especiales o su propia marca. Díganos el conteo y empacamos a esa medida.',
            },
        },
        {
            k: { en: 'Availability', es: 'Disponibilidad' },
            v: {
                en: "The list is what we carry, not a live inventory. Seasons move. Call for today's sheet.",
                es: 'La lista es lo que manejamos, no un inventario en vivo. Las temporadas cambian. Pregunte por la hoja del día.',
            },
        },
        {
            k: { en: 'Delivery', es: 'Entregas' },
            v: {
                en: 'Six days a week across greater Los Angeles, in windows that fit your prep.',
                es: 'Seis días a la semana en el área de Los Ángeles, en horarios que se ajustan a su preparación.',
            },
        },
    ],

    ctaKicker: { en: 'Ask for it', es: 'Pídalo' },
    ctaTitle: { en: "Don't see what you need?", es: '¿No encuentra lo que busca?' },
    ctaBody: {
        en: 'We buy to order. Give us the item and the volume and we will quote it the same day.',
        es: 'Compramos por encargo. Díganos el producto y el volumen y se lo cotizamos el mismo día.',
    },
    ctaMessage: { en: 'Send a message', es: 'Enviar un mensaje' },

    categories: [
        {
            id: 'chiles',
            title: { en: 'Chiles', es: 'Chiles' },
            short: { en: 'Chiles', es: 'Chiles' },
            items: [
                { n: { en: 'Anaheim', es: 'Anaheim' } },
                { n: { en: 'Habanero', es: 'Habanero' } },
                { n: { en: 'Jalapeño', es: 'Jalapeño' } },
                { n: { en: 'Pasilla', es: 'Pasilla' } },
                { n: { en: 'Serrano', es: 'Serrano' } },
            ],
        },
        {
            id: 'onions',
            title: { en: 'Onions', es: 'Cebollas' },
            short: { en: 'Onions', es: 'Cebollas' },
            items: [
                { n: { en: 'Red', es: 'Rojas' } },
                { n: { en: 'Brown / Yellow', es: 'Cafés / Amarillas' } },
                { n: { en: 'White', es: 'Blancas' } },
            ],
        },
        {
            id: 'tomatoes',
            title: { en: 'Tomatoes', es: 'Tomates' },
            short: { en: 'Tomatoes', es: 'Tomates' },
            items: [
                { n: { en: 'Beefsteak', es: 'Bistec' } },
                { n: { en: 'Milpero', es: 'Milpero' } },
                { n: { en: 'Tomatillo', es: 'Tomatillo' } },
                { n: { en: 'Roma', es: 'Roma' } },
            ],
        },
        {
            id: 'dry-grains',
            title: { en: 'Dry grains', es: 'Granos secos' },
            short: { en: 'Grains', es: 'Granos' },
            items: [
                { n: { en: 'Rice', es: 'Arroz' }, tag: { en: '50 lb bags', es: 'sacos de 50 lb' } },
                { n: { en: 'Beans', es: 'Frijoles' }, tag: { en: '50 lb bags', es: 'sacos de 50 lb' } },
                { n: { en: 'Lentil', es: 'Lentejas' }, tag: { en: '50 lb bags', es: 'sacos de 50 lb' } },
            ],
        },
        {
            id: 'leafy-greens',
            title: { en: 'Leafy greens', es: 'Verduras de hoja' },
            short: { en: 'Greens', es: 'Hoja' },
            items: [
                {
                    n: { en: 'Lettuce', es: 'Lechuga' },
                    tag: { en: 'Cello / Romaine / Butter', es: 'Cello / Romana / Mantequilla' },
                },
                { n: { en: 'Cabbage', es: 'Repollo' } },
                { n: { en: 'Cilantro', es: 'Cilantro' }, tag: { en: '60ct / 30ct', es: '60ct / 30ct' } },
            ],
        },
        {
            id: 'citrus',
            title: { en: 'Citrus', es: 'Cítricos' },
            short: { en: 'Citrus', es: 'Cítricos' },
            items: [
                { n: { en: 'Oranges', es: 'Naranjas' } },
                { n: { en: 'Grapefruit', es: 'Toronja' } },
                { n: { en: 'Mandarin', es: 'Mandarina' } },
                { n: { en: 'Lemon', es: 'Limón amarillo' } },
                { n: { en: 'Limes', es: 'Limas' } },
            ],
        },
    ],
}
