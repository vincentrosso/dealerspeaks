document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.button-container button');
    const voiceSelect = document.getElementById('voiceSelect');
    const logOutput = document.getElementById('logOutput'); // Get the textarea element
    let availableVoices = [];

    function logMessage(message) {
        logOutput.value += message + '\n';
        logOutput.scrollTop = logOutput.scrollHeight; // Auto-scroll to the bottom
    }

    function populateVoiceList() {
        if (typeof responsiveVoice !== 'undefined') {
            availableVoices = responsiveVoice.getVoices();
            logMessage("All Available Voices:");
            availableVoices.forEach(voice => {
                logMessage(`Name: ${voice.name}, Lang: ${voice.lang}, Default: ${voice.default}`);
            });

            voiceSelect.innerHTML = '';

            const englishVoices = availableVoices.filter(voice => voice.name && voice.name.toLowerCase().contains('english'));
            logMessage("\nFiltered English Voices:");
            englishVoices.forEach(voice => {
                logMessage(`  Name: ${voice.name}, Lang: ${voice.lang}, Default: ${voice.default}`);
                const option = document.createElement('option');
                option.textContent = `${voice.name} (${voice.lang})`;
                option.value = voice.name;
                voiceSelect.appendChild(option);
            });

            if (englishVoices.length > 0) {
                const defaultEnglishVoice = englishVoices.find(voice => voice.default);
                if (defaultEnglishVoice) {
                    voiceSelect.value = defaultEnglishVoice.name;
                } else {
                    voiceSelect.selectedIndex = 0;
                }
            }
        } else {
            logMessage('responsiveVoice.js not loaded yet.');
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
