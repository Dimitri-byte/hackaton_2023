import torch
from transformers import AutoModelForCausalLM, AutoTokenizer, TextStreamer

tokenizer = AutoTokenizer.from_pretrained("PygmalionAI/pygmalion-6b")
# model = AutoModelForCausalLM.from_pretrained(
#     "upstage/llama-30b-instruct",
#     offload_folder="/srv/IA_WebCreator/tmp",
#     device_map="auto",
#     torch_dtype=torch.float16,
#     # load_in_8bit=True, # utilisation du gpu
#     rope_scaling={"type": "dynamic", "factor": 2} # allows handling of longer inputs
# )

model = AutoModelForCausalLM.from_pretrained(
    "/home/vagrant/IA_WebCreator/models/pygmalion-6b",
    offload_folder="/home/vagrant/IA_WebCreator/tmp",
    device_map="auto",
    torch_dtype=torch.float32,
    # rope_scaling={"type": "dynamic", "factor": 2}
)

prompt = "### User:\nThomas is healthy, but he has to go to the hospital. What could be the reasons?\n\n### Assistant:\n"
inputs = tokenizer(prompt, return_tensors="pt").to(model.device)
# del inputs["token_type_ids"]
streamer = TextStreamer(tokenizer, skip_prompt=True, skip_special_tokens=True)

output = model.generate(**inputs, streamer=streamer, use_cache=True, max_new_tokens=float('inf'))
output_text = tokenizer.decode(output[0], skip_special_tokens=True)
