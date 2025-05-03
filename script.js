document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.button-container button');
    const voiceSelect = document.getElementById('voiceSelect');
    let availableVoices = [];

    function populateVoiceList() {
        if (typeof responsiveVoice !== 'undefined') {
            availableVoices = responsiveVoice.getVoices();
            voiceSelect.innerHTML = ''; // Clear previous options

            const englishVoices = availableVoices.filter(voice => voice.lang.startsWith('en-'));

            englishVoices.forEach(voice => {
                const option = document.createElement('option');
                option.textContent = `${voice.name} (${voice.lang})`;
                option.value = voice.name;
                voiceSelect.appendChild(option);
            });

            // Optionally set a default English voice if available
            if (englishVoices.length > 0) {
                const defaultEnglishVoice = englishVoices.find(voice => voice.default); // Try to find a default
                if (defaultEnglishVoice) {
                    voiceSelect.value = defaultEnglishVoice.name;
                } else {
                    voiceSelect.selectedIndex = 0; // Fallback to the first English voice
                }
            }
        } else {
            console.warn('responsiveVoice.js not loaded yet.');
        }
    }

    function waitForResponsiveVoice() {
        if (typeof responsiveVoice !== 'undefined') {
            populateVoiceList();
        } else {
            setTimeout(waitForResponsiveVoice, 100);
        }
    }

    waitForResponsiveVoice();

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const textToSpeak = button.dataset.text;
            const selectedVoiceName = voiceSelect.value;

            responsiveVoice.speak(textToSpeak, selectedVoiceName);
        });
    });
});
