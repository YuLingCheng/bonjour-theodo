'use strict';

const axios = require('axios');

const secretary = require('./secretary.js');

const pageUrl = 'https://graph.facebook.com/v2.6/me/messages?access_token=' + process.env.FB_PAGE_ACCESS_TOKEN;

const sendMessage = function sendMessage(senderId, messageObject) {
  return axios.post(pageUrl, {
    recipient: {
      id: senderId
    },
    message: messageObject
  });
};

const notifyProcessing = function notifyProcessing(senderId) {
  return axios.post(pageUrl, {
    recipient: {
      id: senderId
    },
    sender_action: 'typing_on'
  });
};

const sendPuzzledApology = function sendPuzzledApology(senderId) {
  return sendMessage(
    senderId,
    secretary.getMsgWithHelpers(
      'Sorry, I\'m afraid I can process this request',
      [secretary.getQuickReply('Help me!', 'INIT_HELP')]
    ));
};

const sendHelpMessage = function sendHelpMessage(senderId) {
  return sendMessage(
    senderId,
    secretary.getMsg(
      'I\'m just a fresh new born bot, please be nice 0:)'
    )
  );
};

module.exports = {
  notifyProcessing: notifyProcessing,
  sendPuzzledApology: sendPuzzledApology,
  sendHelpMessage: sendHelpMessage
};
