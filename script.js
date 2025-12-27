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