from django.shortcuts import render

# Create your views here.
# chat/views.py
import httpx
from django.http import JsonResponse
from rest_framework.decorators import api_view

OPENROUTER_API_KEY = "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"  # 🔐 Replace with your actual key

@api_view(['POST'])
def chat_with_bot(request):
    user_message = request.data.get("message", "")

    if not user_message:
        return JsonResponse({"error": "No message provided"}, status=400)

    try:
        headers = {
            "Authorization": f"Bearer {OPENROUTER_API_KEY}",
            "HTTP-Referer": "http://localhost:3000",
            "Content-Type": "application/json",
        }

        systemPrompt = "You are a helpful female assistant for an eCommerce website named Romofyi. You are Romo-Bot, a friendly shopping female assistant for RomoFyi. Answer questions about login, registrations, orders, fashion, sizes, shipping, and payment. If you don't know something, offer help to contact support."


        payload = {
            "model":"shisa-ai/shisa-v2-llama3.3-70b:free",  # ✅ use correct model ID after confirming
            "messages": [
                {"role": "system", "content": systemPrompt},
                {"role": "user", "content": user_message}
            ]
        }

        response = httpx.post("https://openrouter.ai/api/v1/chat/completions", headers=headers, json=payload)

        if response.status_code != 200:
            return JsonResponse({"error": f"OpenRouter API error {response.status_code}: {response.text}"}, status=500)

        data = response.json()
        if "choices" not in data:
            return JsonResponse({"error": f"Invalid response: {data}"}, status=500)

        reply = data["choices"][0]["message"]["content"]
        return JsonResponse({"reply": reply})

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
