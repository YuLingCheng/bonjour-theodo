const normalizeTrelloCards = (cards) => {
    return cards.map(card => {
        let imageUrl = null;
        if (card.idAttachmentCover) {
            const image = card.attachments.find(attachment => attachment.id === card.idAttachmentCover);
            imageUrl = image.url;
        }
        if (!imageUrl) {
            return null;
        }
        const trello_id = card.id;
        const name = card.name;
        const image = null;

        return {
            trello_id,
            name,
            imageUrl,
        };
    }).filter(person => person);
};

module.exports = { normalizeTrelloCards };