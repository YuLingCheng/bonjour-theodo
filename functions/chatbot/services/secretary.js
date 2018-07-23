'use strict';

module.exports = {
  getMsg: function getMsg(msg) {
    return {
      text: msg
    };
  },

  getImageMsg: function getImageMsg(url) {
    return {
      attachment: {
        type: 'image',
        payload: {
          url: url
        }
      }
    };
  },

  getButton: function getButton(label, action) {
    return {
      type: 'postback',
      title: label,
      payload: action
    };
  },

  getMsgWithButtons: function getMsgWithButtons(msg, buttons) {
    return {
      attachment: {
        type: 'template',
        payload: {
          template_type: 'button',
          text: msg,
          buttons: buttons
        }
      }
    };
  },

  getQuickReply: function getQuickReply(label, action) {
    return {
      content_type: 'text',
      title: label,
      payload: action
    };
  },

  getMsgWithHelpers: function getMsgWithHelpers(msg, quick_replies) {
    return {
      text: msg,
      quick_replies: quick_replies
    };
  }
};
