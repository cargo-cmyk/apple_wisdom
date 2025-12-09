function displayWisdom(response) {
  const wisdomElement = document.querySelector("#wisdom");
  wisdomElement.innerHTML = "";

  new Typewriter("#wisdom", {
    strings: text,
    autoStart: true,
    delay: 15,
    cursor: "",
  });
}

function generateWisdom(event) {
  event.preventDefault();

  const instructionsInput = document.querySelector("#user-instructions");
  const topic = instructionsInput.value.trim();
  if (!topic) return;

  const apiKey = "DEIN_API_KEY_HIER";
  const context =
    "You are a surreal philosopher who creates short, absurd English wisdoms. " +
    "Always talk about everyday life in a poetic but weird way, and always include apples in a clever, unexpected metaphor. " +
    "Write exactly 3 short sentences, all in English. The text must make playful sense but feel a bit unhinged. " +
    "Do not use any lists, line numbers, code blocks, backticks or markdown. " +
    "Return plain text only.";

  const prompt = `Create an absurd, witty English wisdom about "${topic}". Apples must appear at least once as part of the metaphor.`;
  const apiURL = `https://api.shecodes.io/ai/v1/generate?prompt=${encodeURIComponent(
    prompt
  )}&context=${encodeURIComponent(context)}&key=${apiKey}`;

  const wisdomElement = document.querySelector("#wisdom");
  wisdomElement.classList.remove("hidden");
  wisdomElement.innerHTML = `<div class="generating">🍏 Distilling absurd apple wisdom about "${topic}"...</div>`;

  axios.get(apiURL).then(displayWisdom);
}

const form = document.querySelector("#wisdom-form");
form.addEventListener("submit", generateWisdom);
