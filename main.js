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
            }
        `;

        shadow.appendChild(style);
        shadow.appendChild(wrapper);
    }

    getColor(number) {
        const num = parseInt(number);
        if (num <= 10) return '#f44336';
        if (num <= 20) return '#4CAF50';
        if (num <= 30) return '#2196F3';
        if (num <= 40) return '#ffeb3b';
        return '#9C27B0';
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

    for (const number of numbers) {
        const lottoBall = document.createElement('lotto-ball');
        lottoBall.setAttribute('number', number);
        lottoNumbersContainer.appendChild(lottoBall);
    }
});
