function displayWisdom(response) {
  const wisdomElement = document.querySelector("#wisdom");
  wisdomElement.innerHTML = "";

  let text = response.data.answer;

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

  const apiKey = "a3fbf9429t7a57989ac706ao0d0b154f";
  const context =
    "You are a surreal philosopher who creates very short, absurd English wisdoms. " +
    "Always talk about everyday life in a poetic but weird way, and always include apples in a clever, unexpected metaphor. " +
    "Write exactly one very short sentence, all in English. The text must make playful sense but feel a bit unhinged. " +
    "Do not use any lists, line numbers, code blocks, backticks or markdown. Sound like a fortune cookie. " +
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
