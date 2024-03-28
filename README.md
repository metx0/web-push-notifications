# About
Implementation of web push notifications with vanilla JS and a Flask app as the server, using the pywebpush library. 

This currently only works on Chrome, apparently. And it  doesn't use a database, so the info doesn't persist.

# Get started
Create a virtual environment if you wish. 

Install the dependencies running `pip install -r requirements.txt` on the 'server' directory. 

Launch the Flask server running `python app.py` on the 'server' directory. The server should be listening on the port 5000.

Launch the client (index.html) using the live server extension on VS Code. The page must be being served in the port 5500, so there's no problem between the ports. The URL should be http://127.0.0.1:5500/Web%20push/index.html

Make sure you allow notifications in the current window. 

Enter to http://127.0.0.1:5000/send-notification to enter the endpoint used to trigger the push notification. 