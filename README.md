\#hashtaggr
==========
Describe the undescribable.

A spotify app which generates hashtags for the song you're listening to at the moment based on its lyrics. For those moments when gramatically sound sentences just aren't enough.

Server
------
Dependencies:
* Node.js
* MySQL

* Create a database and set up the necessary tables (run tables.sql)
* Store your database credentials in database/config.json
* Install node dependencies using "npm install"
* start the server using "node index.js"

Client
------
* Get a [spotify developer account](https://developer.spotify.com/technologies/apps/#developer-account)
* Create a symlink to the /client directory of the project in "~/Spotify" (Linux) or "My Documents/Spotify" (Windows).
* Restart spotify
* Enter "spotify:app:hashtaggr" into the search bar, and press enter