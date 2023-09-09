import os
import openai
import requests
from flask import Flask, request, jsonify

with open("/srv/IA_WebCreator/bin/api_key.txt", "r") as file:
    open_api_key = file.read().strip()
contextPrompt = "As a professional front end developer, create an HTML and CSS skeleton with responsive design using Bootstrap for the following scenario."
formattingPrompt = "Return the answer as a JSON object with the following format."
jsonFormatString = "{\"htmlCode\": \"html\", \"cssCode\": \"css\"}"
cleaningUpJsonPrompt = "Remove all occurrences of \\n \\ and \\\ in your response."

def generate_text(prompt):
    api_key = open_api_key
    model = "gpt-3.5-turbo"
    endpoint = "https://api.openai.com/v1/chat/completions"

    payload = {
        "model": model,
        "messages": [
            {"role": "system", "content": contextPrompt},
            {"role": "user", "content": prompt},
            {"role": "user", "content": formattingPrompt + jsonFormatString},
            {"role": "user", "content": cleaningUpJsonPrompt}
        ],
        "max_tokens": 100,
        "n": 1,
        "stop": None,
        "temperature": 0.5,
        "stream": False,
    }

    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {api_key}"
    }

    response = requests.post(endpoint, headers=headers, json=payload)
    if response.status_code == 200:
        completions = response.json()["choices"][0]["message"]["content"]
        print("AI's response:", completions)
        print("AI's response in JSON:", response.text)
        return completions
    else:
        print("Request failed with status code:", response.status_code)
        print("Response:", response.text)
        return None

app = Flask(__name__)

@app.route('/generate-text', methods=['POST'])
def generate_text_api():
    prompt = request.json.get('prompt')
    generated_text = generate_text(prompt)

    response = {
        'generated_text': generated_text
    }

    return jsonify(response)

if __name__ == '__main__':
    app.run(host='0.0.0.0')