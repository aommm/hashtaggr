\#hashtaggr
==========
Describe the undescribable.

A spotify app which generates hashtags for the song you're listening to at the moment based on its lyrics. Who needs sentences or proper subject-verb agreement when you've got hashtags?

Made by [aommmm](http://niklaslogren.com) and [NAndreasson](http://nandreasson.se) for the [Way out West Hackathon 2013](http://wowhack2.splashthat.com/).

Server
------
Dependencies:
* Node.js
* MySQL

Instructions:
* Create a database and set up the necessary tables (run tables.sql).
* Edit database/config.json and enter your database credentials.
* Install node dependencies using "npm install".
* Start the server using "node index.js".

Client
------
Instructions:
* Get a [spotify developer account](https://developer.spotify.com/technologies/apps/#developer-account).
* Create a symlink to the /client directory of the project in "~/Spotify" (Linux) or "My Documents/Spotify" (Windows).
* Restart spotify.
* Enter "spotify:app:hashtaggr" into the search bar, and press enter.
