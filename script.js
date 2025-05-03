document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.button-container button');
    const synth = window.speechSynthesis;
    let voices = []; // Will hold the available voices

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
        // You can log the available voices to the console to see their names
        console.log(voices);
    }

    // Voices are usually loaded asynchronously, so we need to handle that
    if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = populateVoiceList;
    } else {
        populateVoiceList();
    }

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const textToSpeak = button.dataset.text;
            const utterance = new SpeechSynthesisUtterance(textToSpeak);

            // Try changing the voice here!
            // Example: Select the first available voice
            if (voices.length > 0) {
                utterance.voice = voices[0];
            }

            // Example: Find a specific voice by name (you'll need to know the exact name)
            // const desiredVoice = voices.find(voice => voice.name === 'Google US English');
            // if (desiredVoice) {
            //     utterance.voice = desiredVoice;
            // }

            // You can also adjust rate and pitch
            // utterance.rate = 0.9; // Speed of speech (0.1 to 10, default 1)
            // utterance.pitch = 1.1; // Pitch of speech (0 to 2, default 1)

            synth.speak(utterance);
        });
    });
});
