## Simple HTML/JS based Firebase notification sender.

### Installing

Enter your API key into the notification-sender.js file at 
```
key=YOUR-FIREBASE-API-KEY
```
in 
```
js/notification-sender.js
```

You can also fill your firebase topics into the topics array at 
```
topics = new Array("all");
``` 
in the notification-sender.js file

#### Example:
```
topics = new Array("all","category1","newCategory");
```

### Usage
Open index.html and type your notification title, message and select categories and your notification will be delivered to every device that uses your Firebase notification account.
