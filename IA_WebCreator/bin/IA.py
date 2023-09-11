import json
import os
import openai
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS

with open("/srv/IA_WebCreator/bin/api_key.txt", "r") as file:
    open_api_key = file.read().strip()
contextPrompt = "As a professional front end developer, create an HTML and CSS skeleton with responsive design using Bootstrap for the following scenario."
resumeTitlePrompt = "Also, please create a summary of the following scenario to be returned as the title"
formattingPrompt = "Return the answer as a RFC8259 compliant JSON object with the following format."
jsonFormatString = "{\"htmlCode\": \"html code\", \"cssCode\": \"css code\", , \"title\": \"summary of the scenario\"}"

def generate_text(prompt):
    api_key = open_api_key
    model = "gpt-4"
    endpoint = "https://api.openai.com/v1/chat/completions"

    payload = {
        "model": model,
        "messages": [
            {"role": "system", "content": contextPrompt + resumeTitlePrompt},
            {"role": "user", "content": prompt},
            {"role": "user", "content": formattingPrompt + jsonFormatString}
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
CORS(app)

@app.route('/generate-text', methods=['POST'])
def generate_text_api():
    prompt = request.json.get('prompt')
    generated_text = generate_text(prompt)
    print(str(generated_text))
    #check data type with type() method
    print(type(str(generated_text)))
    generated_text_str = str(generated_text)
    #convert string to object
    #TODO: corriger erreur convert type NONE to json (problème d'encodage?)
    #generated_text_str.decode("utf-8")
    # json_object = json.loads(generated_text_str.decode("utf-8"))
    response = {
        'generatedResponseText': generated_text
    }

    return jsonify(response)

if __name__ == '__main__':
    app.run(host='0.0.0.0')