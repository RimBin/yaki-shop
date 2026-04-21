# Pokalbių robotas + OpenAI

Projekto viešasis pokalbių robotas (`/api/chatbot`) gali naudoti OpenAI atsakymams generuoti, remdamasis žinių baze (klausimų ir atsakymų įrašais).

## Įjungimas

Į `.env.local` pridėkite:

```bash
OPENAI_API_KEY=your_key_here
```

Tai viskas — kai raktas sukonfigūruotas, API gali veikti vienu iš trijų režimų (žr. žemiau).

## Papildomi nustatymai (rekomenduojama)

```bash
# Serverio naudojamas modelis
OPENAI_CHAT_MODEL=gpt-4o-mini

# Įjungti/išjungti OpenAI režimą (numatyta: true, jei nurodytas OPENAI_API_KEY)
CHATBOT_USE_OPENAI=true

# OpenAI režimas:
# - always: visada naudoti OpenAI (numatyta)
# - fallback: naudoti žinių bazės atsakymą, kai pasitikėjimas didelis, kitaip — OpenAI
# - off: OpenAI nenaudojamas
CHATBOT_OPENAI_MODE=always

# „Fallback" režime OpenAI naudojamas, kai pasitikėjimo reikšmė mažesnė už šią ribą (numatyta: 0.75)
CHATBOT_OPENAI_MIN_CONFIDENCE=0.75

# Generavimo temperatūra (numatyta: 0.2)
CHATBOT_OPENAI_TEMPERATURE=0.2

# Sisteminės užklausos pagal kalbą
CHATBOT_SYSTEM_PROMPT_LT=Tu esi Yakiwood pagalbos asistentas...
CHATBOT_SYSTEM_PROMPT_EN=You are a Yakiwood support assistant...
```

Patarimai:
