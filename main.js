// Theme Toggle Logic
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.textContent = 'Light Mode';
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    themeToggle.textContent = isDark ? 'Light Mode' : 'Dark Mode';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

class LottoBall extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        const wrapper = document.createElement('div');
        wrapper.setAttribute('class', 'ball');

        const number = this.getAttribute('number');
        wrapper.textContent = number;

        const style = document.createElement('style');
        style.textContent = `
            .ball {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 1.5rem;
                font-weight: bold;
                color: white;
                background-color: ${this.getColor(number)};
                box-shadow: 0 4px 10px rgba(0,0,0,0.2);
                transition: transform 0.3s ease;
            }
            .ball:hover {
                transform: scale(1.1) rotate(10deg);
            }
        `;

        shadow.appendChild(style);
        shadow.appendChild(wrapper);
    }

    getColor(number) {
        const num = parseInt(number);
        if (num <= 10) return '#fcc419'; // Yellow
        if (num <= 20) return '#4dabf7'; // Blue
        if (num <= 30) return '#ff6b6b'; // Red
        if (num <= 40) return '#868e96'; // Grey
        return '#51cf66'; // Green
    }
}

customElements.define('lotto-ball', LottoBall);


document.getElementById('generator-btn').addEventListener('click', () => {
    const lottoNumbersContainer = document.getElementById('lotto-numbers-container');
    lottoNumbersContainer.innerHTML = '';
    const numbers = new Set();
    while(numbers.size < 6) {
        numbers.add(Math.floor(Math.random() * 45) + 1);
    }

    const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);

    sortedNumbers.forEach((number, index) => {
        setTimeout(() => {
            const lottoBall = document.createElement('lotto-ball');
            lottoBall.setAttribute('number', number);
            lottoNumbersContainer.appendChild(lottoBall);
        }, index * 100);
    });
});
