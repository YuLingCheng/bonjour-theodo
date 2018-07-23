# Messenger Chatbot Starter Kit

This starter kit uses [Serverless](https://serverless.com/) and AWS lambda.

Follow installation process to get started with your [Messenger chatbot](https://developers.facebook.com/docs/messenger-platform).

For more instructions on how to set up your Facebook app, have a look at [this tutorial](http://www.theodo.fr/blog/2017/02/have-your-mvp-running-in-prod-within-15-minutes-with-serverless/).

## Content of the starter kit

Once installed and set up, this starter kit will provide you with a chatbot that will send a default message with a helper that the user can click to get some help.

+ [serverless.yml](serverless.yml) contains minimum config to create a Lambda function with GET and POST endpoints to connect with your Facebook Messenger app
+ [handler.js](functions/chatbot/handler.js) contains the Lambda function
+ [bot.js](functions/chatbot/services/bot.js) contains the default services to send messages
+ [secretary.js](functions/chatbot/services/secretary.js) contains the default services to generate Messenger formatted messages (image messages, messages with action button, messages with quick replies... Add more using [Facebook documentation](https://developers.facebook.com/docs/messenger-platform/reference/send-api))

## Get started

### Requirements

+ Have Serverless installed and set with your AWS credentials.
+ Have a Facebook page that you own
+ Have a [Facebook app](https://developers.facebook.com/apps/) with the Messenger module

### Module dependencies

This basic chatbot Lambda function uses axios to post to the Facebook page.

### Installation

```bash
sls install -u https://github.com/YuLingCheng/messenger-chatbot-starter-kit -n my-chatbot && cd my-chatbot
npm install
```
In [serverless.yml](serverless.yml), pick a `FB_APP_TOKEN` and fill in your `FB_PAGE_ACCESS_TOKEN` under `functions.chatbot.environment`.
If you don't know how to the `FB_PAGE_ACCESS_TOKEN` check [this article](http://www.theodo.fr/blog/2017/02/have-your-mvp-running-in-prod-within-15-minutes-with-serverless/)

+ You can change `provider.region` if you want to pick another data center.
+ You can change `provider.stage` if you want to change environment stage.

### Deploy

To deploy:
```bash
# First time
sls deploy

# Deploy only the function (much faster)
sls deploy -f chatbot
```

You can remove your project from AWS my running
```bash
sls remove -v
```

### Testing your chatbot

Test your function locally with the following command:
```bash
sls invoke local -f chatbot -p <path_to_file>.yml # you can use .json files as well
```

Test your deployed function with the following command:
```bash
sls invoke -f chatbot -p <path_to_file>.yml
```

There are some test files available in [testFiles](testFiles), you can test:

+ the GET response with [testGET.yml](testFiles/testGET.yml)
+ the POST response to a text message with [testPOSTM.yml](testFiles/testPOSTM.yml)
+ the POST response to a quick message with [testPOSTQM.yml](testFiles/testPOSTQM.yml)
+ the POST response to a payback with [testPOSTAB.yml](testFiles/testPOSTAB.yml)

You'll need to get your senderId and set it in these files.

To get your senderId,

1. add `console.log(senderId);` in the [handler.js](functions/chatbot/handler.js#L20)
1. deploy the lambda
1. set up the webhook on facebook using the endpoint created
1. subscribe your app to the page
1. send a message to your page
1. get your senderId from the logs using `sls logs -f chatbot`

## Bonus

### cUrl commands to set up your Messenger Bot initial messages

Set initial message
```
curl -X POST -H "Content-Type: application/json" -d '{
  "setting_type":"greeting",
  "greeting":{
    "text":"Hello {{user_first_name}}"
  }
}' "https://graph.facebook.com/v2.6/me/thread_settings?access_token=YOUR_FB_PAGE_ACCESS_TOKEN"
```

Add initial call to action
```
curl -X POST -H "Content-Type: application/json" -d '{
  "setting_type":"call_to_actions",
  "thread_state":"new_thread",
  "call_to_actions":[
    {
      "payload":"INIT_HELP"
    }
  ]
}' "https://graph.facebook.com/v2.6/me/thread_settings?access_token=YOUR_FB_PAGE_ACCESS_TOKEN"   
```   
