
        let RGBColor = document.getElementById('rgb_color');
        let colorContainer = document.getElementsByClassName('color_container')[0];
        let randomColor = null;
        let winAudio = new Audio('win.wav');
        let loseAudio = new Audio('lose.wav');

        let scoreValue = document.getElementById('score');
        let score = parseInt(window.localStorage.getItem('score')) || 0; // Initialize score with local storage value or 0
        scoreValue.textContent = score; // Update displayed score when the page loads

        function generateRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
            // return Math.floor(Math.random()*256) //will generate a random num bet min & max
        }

        function generateRandomColor() {
            let red = generateRandomNumber(0, 256);
            let green = generateRandomNumber(0, 256);
            let blue = generateRandomNumber(0, 256);
            return `rgb(${red}, ${green}, ${blue})`;
        }

        function startGame() {
            colorContainer.innerHTML = '';
            randomColor = generateRandomColor();
            RGBColor.textContent = randomColor;
            // RGBColor.style.backgroundColor = randomColor;
            let ansIndex = generateRandomNumber(0, 8);
            console.log(ansIndex);

            for (let i = 0; i < 9; i++) {
                let colorBox = document.createElement('span');
                colorBox.className = 'color_box';
                colorBox.style.backgroundColor = i == ansIndex ? randomColor : generateRandomColor();
                colorContainer.append(colorBox);
                colorBox.addEventListener('click', checkColor);
            }
        }

        function checkColor(e) {
            const userColor = e.target.style.backgroundColor;
            let userSelect = e.target;
            if (userColor === randomColor) {
                winAudio.play();
                userSelect.classList.add('match');
                score++;
                scoreValue.textContent = score;
            } else {
                loseAudio.play();
                userSelect.classList.add('noMatch');
                score = 0; // Reset score on wrong answer
                scoreValue.textContent = score;
                // alert('Agh!! You lose!!');
            }
            window.localStorage.setItem('score', score); // Update local storage with new score
            colorContainer.querySelectorAll('.color_box').forEach((color) => {
                color.style.pointerEvents = 'none';
            });
            setTimeout(startGame, 2200);
        }

        window.addEventListener('load', startGame);
