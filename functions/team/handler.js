'use strict';

const normalizer = require('./services/normalizer');
const databaseManager = require('./services/databaseManager');

module.exports.teamManager = (event, context, callback) => {
  // const cardsApi = `https://api.trello.com/1/boards/${process.env.TRELLO_CONTACT_BOARD_ID}/cards`;
  const cardsApi = `https://api.trello.com/1/lists/${process.env.THEODO_LIST_ID}/cards`;

  const key = process.env.TRELLO_API_KEY;
  const token = process.env.TRELLO_API_TOKEN;

  const fields = 'name,idAttachmentCover';
  const attachments = 'cover';
  const attachment_fields = 'url';

  // get date since the last update
  const today = new Date();
  const updateRate = new Date().setDate(today.getDate() - process.env.PEOPLE_SOURCING_RATE);
  const lastUpdate = new Date(updateRate);
  const since = lastUpdate.toISOString();

  const queryParameters = {
    key,
    token,
    since,
    fields,
    attachments,
    attachment_fields
  }
  const encodedParameters = Object.keys(queryParameters).map(key => `${key}=${encodeURIComponent(queryParameters[key])}`).join('&');
  const url = `${cardsApi}?${encodedParameters}`;
  const cards = fetch(url)
    .then(response => response.json())
    .then(cards => {
      const people = normalizer.normalizeTrelloCards(cards);
      databaseManager.insertPeople(people);
    })
    .catch(error => console.error(error));
};
