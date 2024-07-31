   let speechSynth = window.speechSynthesis;
        let voices = [];

        // DOM elements
        const textInput = document.getElementById('textInput');
        const voiceSelect = document.getElementById('voiceSelect');
        const rateInput = document.getElementById('rate');
        const pitchInput = document.getElementById('pitch');
        const startBtn = document.getElementById('startBtn');
        const stopBtn = document.getElementById('stopBtn');

        // Populate voice list
        function populateVoiceList() {
            voices = speechSynth.getVoices();
            voiceSelect.innerHTML = '';
            voices.forEach((voice, index) => {
                const option = document.createElement('option');
                option.textContent = `${voice.name} (${voice.lang})`;
                option.setAttribute('data-lang', voice.lang);
                option.setAttribute('data-name', voice.name);
                voiceSelect.appendChild(option);
            });
        }

        populateVoiceList();
        if (speechSynthesis.onvoiceschanged !== undefined) {
            speechSynthesis.onvoiceschanged = populateVoiceList;
        }

        // Start speaking
        function speak() {
            if (speechSynth.speaking) {
                console.error('speechSynthesis.speaking');
                return;
            }
            if (textInput.value !== '') {
                const utterance = new SpeechSynthesisUtterance(textInput.value);
                utterance.onend = function (event) {
                    console.log('SpeechSynthesisUtterance.onend');
                }
                utterance.onerror = function (event) {
                    console.error('SpeechSynthesisUtterance.onerror');
                }
                const selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');
                for (let i = 0; i < voices.length; i++) {
                    if (voices[i].name === selectedOption) {
                        utterance.voice = voices[i];
                        break;
                    }
                }
                utterance.pitch = pitchInput.value;
                utterance.rate = rateInput.value;
                speechSynth.speak(utterance);
            }
        }

        // Event listeners
        startBtn.addEventListener('click', speak);
        stopBtn.addEventListener('click', () => {
            speechSynth.cancel();
        });