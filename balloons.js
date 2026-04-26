document.addEventListener('DOMContentLoaded', () => {
    const filename = window.location.pathname.split('/').pop() || 'index.html';
    let balloonCount = 0;
    let startIndex = 1;

    if (filename === 'index.html' || filename === '') {
        balloonCount = 6;
        startIndex = 1;
    } else if (filename === 'cause.html') {
        balloonCount = 6;
        startIndex = 7;
    } else if (filename === 'last.html') {
        balloonCount = 7;
        startIndex = 13;
    }

    const colors = ['#ff69b4', '#ff1493', '#ffc0cb', '#da70d6', '#ee82ee', '#dda0dd', '#ba55d3'];
    const imageFolder = 'images/';

    // Create Modal HTML structure if it doesn't exist
    if (!document.getElementById('polaroid-modal')) {
        const modal = document.createElement('div');
        modal.id = 'polaroid-modal';
        modal.className = 'polaroid-modal';
        modal.innerHTML = `
            <span class="close-modal">&times;</span>
            <div class="polaroid-card">
                <div class="polaroid-img-container">
                    <img src="" alt="Memory" class="polaroid-img" id="polaroid-img">
                    <div class="polaroid-placeholder" id="polaroid-placeholder">Loading Image...</div>
                </div>
                <div class="polaroid-caption">Princess Vibes 💖</div>
            </div>
        `;
        document.body.appendChild(modal);

        modal.addEventListener('click', (e) => {
            if (e.target.id === 'polaroid-modal' || e.target.className === 'close-modal') {
                modal.classList.remove('show');
            }
        });
    }

    const modal = document.getElementById('polaroid-modal');
    const modalImg = document.getElementById('polaroid-img');
    const placeholder = document.getElementById('polaroid-placeholder');

    for (let i = 0; i < balloonCount; i++) {
        const balloon = document.createElement('div');
        balloon.className = 'balloon';

        // Position at borders only
        const side = Math.floor(Math.random() * 4);
        let posX, posY;

        if (side === 0) { // Top
            posX = Math.random() * 90;
            posY = Math.random() * 5;
        } else if (side === 1) { // Right
            posX = 90 + Math.random() * 5;
            posY = Math.random() * 90;
        } else if (side === 2) { // Bottom
            posX = Math.random() * 90;
            posY = 90 + Math.random() * 5;
        } else { // Left
            posX = Math.random() * 5;
            posY = Math.random() * 90;
        }

        balloon.style.left = `${posX}vw`;
        balloon.style.top = `${posY}vh`;

        const color = colors[Math.floor(Math.random() * colors.length)];
        balloon.style.backgroundColor = color;

        const duration = 4 + Math.random() * 4;
        balloon.style.animationDuration = `${duration}s`;
        balloon.style.animationDelay = `${Math.random() * -5}s`;

        const imgIndex = startIndex + i;

        balloon.addEventListener('click', () => {
            if (!balloon.classList.contains('popped')) {
                balloon.classList.add('popped');

                setTimeout(() => {
                    const imgSrc = `${imageFolder}${imgIndex}.jpg`;
                    modalImg.src = imgSrc;
                    modalImg.style.display = 'none';
                    placeholder.style.display = 'block';

                    modalImg.onload = () => {
                        modalImg.style.display = 'block';
                        placeholder.style.display = 'none';
                    };

                    modalImg.onerror = () => {
                        placeholder.innerText = `Place image ${imgIndex}.jpg here!`;
                        modalImg.style.display = 'none';
                        placeholder.style.display = 'block';
                    };

                    modal.classList.add('show');
                }, 300);
            }
        });

        document.body.appendChild(balloon);
    }
});
