import os
import openai
import requests

with open("api_key.txt", "r") as file:
    open_api_key = file.read().strip()
contextPrompt = "As a professional front end developper, create an html and css skeleton with bootstrap responsice design for the following scenario."
formattingPrompt = "Return the answer as a JSON Object with the following format."
jsonFormatString = "{\"htmlCode\": \"html\", \"CSSCode\": \"css\"}"
cleaningUpJsonPrompt = "Remove all occurences of \n \\n \\ and \\\ in your response."

def generate_text(prompt):
    api_key = open_api_key
    model = "gpt-3.5-turbo"
    endpoint = "https://api.openai.com/v1/chat/completions"

    payload = {
        "model": model,
        "messages": [
            {"role": "user", "content": contextPrompt}, # Eg. As a developper building a website, I would like...
            {"role": "user", "content": prompt},
            {"role": "user", "content": formattingPrompt + jsonFormatString},
            {"role": "user", "content": cleaningUpJsonPrompt}],
        "max_tokens": 100, # The maximum number of tokens to generate in the chat completion.
        "n": 1,
        "stop": None,
        "temperature": 0.5,
        "stream": False,
    }

    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {api_key}"
    }

    response = requests.post(endpoint, headers=headers, json=payload, stream=False)
    if response.status_code == 200:
        completions = response.json()["choices"][0]["message"]["content"]
        print("AI's response:", completions)
        print("AI's response in json:", response.text)
        return response
    else:
        print("Request failed with status code:", response.status_code)
        print("Response:", response.text)
        return None

generated_text = generate_text("Show me an image element with a mountain for the bootstrap page.")
print(generated_text)
