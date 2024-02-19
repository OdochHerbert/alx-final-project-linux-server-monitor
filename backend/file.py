from flask import Flask, request, jsonify
import shutil
import os
import easygui
from werkzeug.utils import secure_filename

app = Flask(__name__)

UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def window():
    value = easygui.fileopenbox()
    return value

@app.route('/open', methods=['GET'])
def open_file():
    file_path = window()
    try:
        os.startfile(file_path)
        return jsonify({'message': 'File opened successfully'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/copy', methods=['POST'])
def copy_file():
    if 'file' not in request.files or 'directory' not in request.form:
        return jsonify({'error': 'File and directory not provided'}), 400

    file = request.files['file']
    directory = request.form['directory']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    filename = secure_filename(file.filename)
    file.save(os.path.join(directory, filename))
    return jsonify({'message': 'File copied successfully'})

@app.route('/delete', methods=['POST'])
def delete_file():
    file_path = request.form.get('file')
    if os.path.exists(file_path):
        os.remove(file_path)
        return jsonify({'message': 'File deleted successfully'})
    else:
        return jsonify({'error': 'File not found'}), 404

# Define other operations similarly

if __name__ == '__main__':
    app.run(debug=True, port=5006)

