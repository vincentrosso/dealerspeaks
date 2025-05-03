document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.button-container button');
    const synth = window.speechSynthesis;

    if (!synth) {
        alert('Text-to-speech is not supported in your browser.');
        return;
    }

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const textToSpeak = button.dataset.text;
            const utterance = new SpeechSynthesisUtterance(textToSpeak);

            // You can customize the voice, rate, and pitch here if needed
            // utterance.voice = synth.getVoices().find(voice => voice.name === 'Google US English');
            // utterance.rate = 0.9;
            // utterance.pitch = 1.1;

            synth.speak(utterance);
        });
    });
});
