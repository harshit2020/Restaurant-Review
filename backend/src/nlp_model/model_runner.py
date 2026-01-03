import torch
from transformers import DistilBertTokenizer, DistilBertForSequenceClassification

MODEL_PATH = "./my_model"

tokenizer = DistilBertTokenizer.from_pretrained(MODEL_PATH)
model = DistilBertForSequenceClassification.from_pretrained(MODEL_PATH)
model.eval()  

@torch.inference_mode()
def analyze_text(text: str):
    inputs = tokenizer(
        text,
        return_tensors="pt",
        truncation=True,
        padding=True,
        max_length=512
    )

    outputs = model(**inputs)
    logits = outputs.logits

    predicted_class_id = logits.argmax(dim=-1).item()
    return model.config.id2label[predicted_class_id]


