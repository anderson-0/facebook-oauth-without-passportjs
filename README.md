# Facebook Authentication
An app to authenticate users using their Github account and save information on SQlite using Prisma ORM

## NGrok Settings
* For your app to receive the token back from Facebook after the authentication you will need a valid URL. I recommend using NGrok https://ngrok.com/.
* Just download it and execute it like this on your terminal
  * On Mac, you would execute the following command to run ngrok on your port 4000: 
  ```
    ./ngrok http 4000
  ```
* Copy the HTTPS url generated and replace the existing ngrok URL in your .env file under FACEBOOK_CALLBACK_URL, but leave the /facebook/callback

## Facebook Settings
* Create a Facebook Developer Account
* Go to https://developers.facebook.com/apps and click to "Create App"
* Select "Consumer" as the type of the App.
* Fill out the form with name for the app and contact email.
* On the new page that was loaded, on the Facebook Login card, click on "Set Up"
* Select "Web"
* On your site URL, add your ngrok URL
* On the left panel, click on Settings -> Basic
* Copy your ngrok URL to the field App Domains
* In the "Privacy Policy URL" and "User Data Deletion" fields, add any site on web for this example
* On your left panel, you should see a section Facebook Login. Click there and then in Settings
* Copy your callback url from .env to the field "Valid OAuth Redirect URIs"


## Installation
```
yarn
```

# Prisma Configuration
The file data/prisma/schema.prisma is the place where you should define your all your table schemas


# Create your tables using Prisma
Before running your app execute the following terminal command to generate your tables on SQLite. 
```
yarn prisma migrate dev
```

This should be done regardless of the DB you are using.

# Running the Application
```
yarn dev
```

# Routes

* http://localhost:4000/facebook/signin -> Route to signin using your Facebook account
* http://localhost:4000/facebook/callback -> Route that will receive Facebook's request with a code query parameter to be exchanged by an access_token
* http://localhost:4000/facebook/user -> Route that expects the user ID and returns it's data