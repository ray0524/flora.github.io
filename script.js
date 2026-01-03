let currentIndex = 0;
    function moveSlide(step) {
        const slides = document.querySelectorAll('.carousel-slide');
        if (slides.length === 0) return;

        // 移除當前 active
        slides[currentIndex].classList.remove('active');
        
        // 計算新索引
        currentIndex = (currentIndex + step + slides.length) % slides.length;
        
        // 加入新 active
        slides[currentIndex].classList.add('active');
    }

    function rwdImageMap() {
        const maps = document.getElementsByTagName('map');
        for (let map of maps) {
            const img = document.querySelector(`img[usemap="#${map.name}"]`);
            if (!img) continue;
    
            const ratio = img.clientWidth / img.naturalWidth; // 計算縮放比例
            const areas = map.getElementsByTagName('area');
    
            for (let area of areas) {
                if (!area.dataset.coords) area.dataset.coords = area.coords; // 備份原始座標
                
                const coords = area.dataset.coords.split(',');
                const scaledCoords = coords.map(c => Math.round(c * ratio));
                area.coords = scaledCoords.join(',');
            }
        }
    }
    
    // 監聽圖片載入與視窗縮放
    window.addEventListener('load', rwdImageMap);
    window.addEventListener('resize', rwdImageMap);


    const authTitle = document.getElementById('auth-title');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const switchBtn = document.getElementById('switch-auth');
    const footerText = document.getElementById('footer-text');

    switchBtn.addEventListener('click', function() {
        if (loginForm.style.display !== 'none') {
            // 切換到註冊
            loginForm.style.display = 'none';
            registerForm.style.display = 'block';
            authTitle.innerText = '會員註冊';
            footerText.innerText = '已經是會員了？';
            switchBtn.innerText = '點此登入';
        } else {
            // 切換回登入
            loginForm.style.display = 'block';
            registerForm.style.display = 'none';
            authTitle.innerText = '會員登入';
            footerText.innerText = '還不是會員？';
            switchBtn.innerText = '點此註冊';
        }
    });

    function validateAndLogin() {
        // 1. 抓取輸入框的值
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
    
        // 2. 判斷是否為空
        if (email === "" || password === "") {
            alert("請輸入完整的帳號與密碼！");
            return; // 攔截，不往下執行跳轉
        }
    
        // 3. 判斷格式 (簡單檢查是否有 @)
        if (!email.includes("@")) {
            alert("Email 格式不正確！");
            return;
        }

        if (password.length < 6) {
            alert("密碼長度不足！");
            return;
        }
    
        // 4. 通過檢查才執行跳轉
        alert("登入成功！歡迎回到 FLORA");
        window.location.href = 'index.html'; 
    }

function validateAndRegister() {

    // 1. 安全地抓取元素
    const elName = document.getElementById('reg-name');
    const elEmail = document.getElementById('reg-email');
    const elPhone = document.getElementById('reg-phone');
    const elAddress = document.getElementById('reg-address');
    const elPw = document.getElementById('reg-password');

    // 2. 檢查有沒有哪個 ID 寫錯了 (如果噴出 null 代表 HTML 的 ID 寫錯)
    if (!elName || !elEmail || !elPhone || !elAddress || !elPw) {
        console.error("錯誤：找不到其中一個輸入框的 ID，請檢查 HTML！");
        alert("系統錯誤：找不到輸入欄位");
        return;
    }

    // 3. 取得數值並去空白
    const name = elName.value.trim();
    const email = elEmail.value.trim();
    const phone = elPhone.value.trim();
    const address = elAddress.value.trim();
    const password = elPw.value.trim();

    // 4. 判斷是否為空
    if (name === "" || email === "" || phone === "" || address === "" || password === "") {
        alert("所有欄位都是必填的喔！");
        return;
    }

    // 5. 格式檢查
    if (!email.includes("@")) {
        alert("Email 格式看起來不太對勁...");
        return;
    }

    if (phone.length < 9) {
        alert("電話號碼長度不足！");
        return;
    }

    if (password.length < 6) {
        alert("密碼長度不足！");
        return;
    }

    // 6. 成功跳轉
    alert("註冊成功！歡迎來到 FLORA");
    window.location.href = 'index.html'; 
}