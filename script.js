document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.button-container button');
    const voiceSelect = document.getElementById('voiceSelect');
    const synth = window.speechSynthesis;
    let voices = [];

    function populateVoiceList() {
        voices = synth.getVoices().sort(function (a, b) {
            const aname = a.name.toUpperCase();
            const bname = b.name.toUpperCase();
            if (aname < bname) {
                return -1;
            } else if (aname === bname) {
                return 0;
            } else {
                return +1;
            }
        });

        voiceSelect.innerHTML = ''; // Clear previous options
        voices.forEach(voice => {
            const option = document.createElement('option');
            option.textContent = `${voice.name} (${voice.lang})`;
            option.value = voice.name;
            voiceSelect.appendChild(option);
        });
    }

    if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = populateVoiceList;
    } else {
        populateVoiceList();
    }

    // Set the initial voice if available
    synth.addEventListener('voiceschanged', () => {
        if (voices.length > 0 && voiceSelect.options.length > 0) {
            // Optionally set a default voice here, e.g., the first one
            voiceSelect.selectedIndex = 0;
        }
    });

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const textToSpeak = button.dataset.text;
            const utterance = new SpeechSynthesisUtterance(textToSpeak);

            const selectedVoiceName = voiceSelect.value;
            const selectedVoice = voices.find(voice => voice.name === selectedVoiceName);

            if (selectedVoice) {
                utterance.voice = selectedVoice;
            }

            synth.speak(utterance);
        });
    });
});
