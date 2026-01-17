// 1. Inisialisasi Variable
        const canvas = document.getElementById("gameCanvas");
        const ctx = canvas.getContext("2d");
        
        const box = 20; // Ukuran satu kotak (grid)
        let score = 0;
        
        // Posisi awal ular
        let snake = [];
        snake[0] = { x: 9 * box, y: 10 * box };

        // Posisi awal makanan
        let food = {
            x: Math.floor(Math.random() * 19 + 1) * box,
            y: Math.floor(Math.random() * 19 + 1) * box
        };

        let d; // Arah gerakan

        // 2. Event Listener untuk Keyboard
        document.addEventListener("keydown", direction);

        function direction(event) {
            let key = event.keyCode;
            // Cegah ular berbalik arah langsung (misal: dari kiri langsung ke kanan)
            if( key == 37 && d != "RIGHT") { d = "LEFT"; }
            else if(key == 38 && d != "DOWN") { d = "UP"; }
            else if(key == 39 && d != "LEFT") { d = "RIGHT"; }
            else if(key == 40 && d != "UP") { d = "DOWN"; }
        }

        // 3. Fungsi Deteksi Tabrakan
        function collision(head, array) {
            for(let i = 0; i < array.length; i++) {
                if(head.x == array[i].x && head.y == array[i].y) {
                    return true;
                }
            }
            return false;
        }

        // 4. Fungsi Utama Menggambar Game
        function draw() {
            // Bersihkan canvas setiap frame
            ctx.fillStyle = "#000"; 
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Gambar Ular
            for(let i = 0; i < snake.length; i++) {
                ctx.fillStyle = (i == 0) ? "#2ecc71" : "white"; // Kepala hijau, badan putih
                ctx.fillRect(snake[i].x, snake[i].y, box, box);
                
                ctx.strokeStyle = "black"; // Garis pinggir kotak ular
                ctx.strokeRect(snake[i].x, snake[i].y, box, box);
            }

            // Gambar Makanan
            ctx.fillStyle = "#e74c3c"; // Warna merah
            ctx.fillRect(food.x, food.y, box, box);

            // Posisi kepala lama
            let snakeX = snake[0].x;
            let snakeY = snake[0].y;

            // Logika Gerakan
            if(d == "LEFT") snakeX -= box;
            if(d == "UP") snakeY -= box;
            if(d == "RIGHT") snakeX += box;
            if(d == "DOWN") snakeY += box;

            // Jika ular memakan makanan
            if(snakeX == food.x && snakeY == food.y) {
                score++;
                document.getElementById("score").innerText = score;
                // Buat makanan baru di posisi acak
                food = {
                    x: Math.floor(Math.random() * 19 + 1) * box,
                    y: Math.floor(Math.random() * 19 + 1) * box
                }
                // Jangan hapus ekor (ular bertambah panjang)
            } else {
                // Hapus ekor (ular bergerak normal)
                snake.pop();
            }

            // Kepala baru
            let newHead = {
                x : snakeX,
                y : snakeY
            };

            // Aturan Game Over (Tabrak tembok atau badan sendiri)
            if(snakeX < 0 || snakeX > canvas.width - box || 
               snakeY < 0 || snakeY > canvas.height - box || 
               collision(newHead, snake)) {
                
                clearInterval(game); // Hentikan game loop
                alert("Game Over! Skor Anda: " + score);
                location.reload(); // Refresh halaman
            }

            snake.unshift(newHead); // Tambahkan kepala baru di depan
        }

        // Jalankan fungsi draw setiap 100ms (Kecepatan game)
        let game = setInterval(draw, 100);
