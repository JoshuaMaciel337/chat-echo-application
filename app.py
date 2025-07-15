from flask import Flask, render_template, request, jsonify
import json

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    message = data.get('message', '')
    
    # Simple echo response for now
    response = {
        'message': f"Echo: {message}",
        'timestamp': 'now'
    }
    
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True, port=8000)
