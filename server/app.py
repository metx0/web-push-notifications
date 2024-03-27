from flask import Flask, request, jsonify
from flask_cors import CORS
from pywebpush import webpush, WebPushException

app = Flask(__name__)
# To handle requests from external sources
CORS(app)

VAPID_PRIVATE_KEY = 'yZPxyTnoniaB2jswVDv2V99LUuRSIlDfln-k7p7iFFY'

@app.route('/')
def home():
	return 'hello'

sub_database = []

@app.route('/save-subscription', methods=['POST'])
def save_subscription():
	sub_database.append(request.json)
	print(sub_database)
	print(len(sub_database))
	return jsonify({'status': 'sucess', 'message': 'subscription saved'})

# The subscription object received may look like this:
# {'endpoint': 'https://fcm.googleapis.com/fcm/send/cuR2IzaQ3_Q:APA91bH0vFgL-nCVYVMRWaf3DpI-agwT4xeEPN8r9vOnpLXDegAsgGlI9SG_yp1grj6UKEXh2zf08pO3aeHFFeMMsrhnfsruBboa2drIi3HrVdW8btIFPcJvtlk28FF9XZ7z6n52xLV_', 
# 'expirationTime': None, 'keys': {'p256dh': 'BPpbe-YFEIGandCbS-p6zjLjMMggGIk9TamTqWee12vLf9oLyQgX0okK0cA0c7ExyVLBfBX8XIuVIQD6Ux_tItw', 'auth': 'N33JDZwp9aZmbKNt66DE2Q'}}

@app.route('/send-notification', methods=['GET', 'POST'])
def send_notification():
	if request.method == 'GET':
		try:
			# Send the web push message to the first entry of the 'database'
			webpush(subscription_info = sub_database[0], data="test", vapid_private_key=VAPID_PRIVATE_KEY, vapid_claims={'sub': 'mailto:migtorruco@gmail.com'})
			return jsonify({'status': 'success', 'message': 'notification sent'})
		except WebPushException as ex:
			print("An error ocurred sending notification:", str(ex))
			return jsonify({'status': 'error', 'message': 'failed to send notification'})

if __name__ == "__main__":
	app.run(debug=True)