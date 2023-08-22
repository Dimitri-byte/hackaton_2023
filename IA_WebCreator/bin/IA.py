import os
import openai
import requests

with open("api_key.txt", "r") as file:
    open_api_key = file.read().strip()

def generate_text(prompt):
    api_key = open_api_key
    model = "gpt-3.5-turbo"
    endpoint = "https://api.openai.com/v1/chat/completions"
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {api_key}"
    }

    data = {
        "model": model,
        "messages": [{"role": "user", "content": prompt}],
        "max_tokens": 100,
        "n": 1,
        "stop": None,
        "temperature": 0.5,
    }
    response = requests.post(endpoint, headers=headers, json=data)
    if response.status_code == 200:
        completions = response.json()["choices"][0]["message"]["content"]
        print("AI's response:", completions)
        return completions
    else:
        print("Request failed with status code:", response.status_code)
        print("Response:", response.text)
        return None

generated_text = generate_text("Say this is a test!")
print(generated_text)
