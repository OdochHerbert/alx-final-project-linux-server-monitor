from flask import Flask, render_template
from flask_socketio import SocketIO
import subprocess
import time

app = Flask(__name__)
socketio = SocketIO(app)

@app.route('/')
def index():
    return render_template('bandwidth_socket.html')

@socketio.on('get_bandwidth_info')
def get_bandwidth_info():
    try:
        while True:
            result = subprocess.check_output(['ifconfig'])
            socketio.emit('bandwidth_info', str(result))
            time.sleep(5)  # Emit every 5 seconds
    except Exception as e:
        print(f"An error occurred: {str(e)}")

if __name__ == '__main__':
    socketio.run(app, debug=True, port=5009)

