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


        //購物車
        // 更改商品數量
        function changeQty(btn, change) {
            const qtyInput = btn.parentElement.querySelector('.qty-input');
            let currentQty = parseInt(qtyInput.value);
            let newQty = currentQty + change;
            
            if (newQty < 1) newQty = 1;
            if (newQty > 99) newQty = 99;
            
            qtyInput.value = newQty;
            updateItemSubtotal(btn);
            updateTotal();
        }

        // 更新單項小計
        function updateItemSubtotal(element) {
            const item = element.closest('.cart-item');
            const price = parseInt(item.querySelector('.item-price').textContent.replace(/[^0-9]/g, ''));
            const qty = parseInt(item.querySelector('.qty-input').value);
            const subtotal = price * qty;
            item.querySelector('.item-subtotal').textContent = `NT$ ${subtotal.toLocaleString()}`;
        }

        // 更新總計
        function updateTotal() {
            const items = document.querySelectorAll('.cart-item');
            let subtotal = 0;
            let selectedCount = 0;

            items.forEach(item => {
                const checkbox = item.querySelector('.item-checkbox');
                if (checkbox.checked) {
                    const itemSubtotal = parseInt(item.querySelector('.item-subtotal').textContent.replace(/[^0-9]/g, ''));
                    subtotal += itemSubtotal;
                    selectedCount++;
                }
            });

            // 計算運費（滿1500免運）
            const shipping = subtotal >= 1500 ? 0 : 100;
            
            // 計算折扣（假設新會員9折）
            const discount = 0; // 可依需求調整
            
            // 總計
            const total = subtotal + shipping - discount;

            // 更新顯示
            document.getElementById('subtotal').textContent = `NT$ ${subtotal.toLocaleString()}`;
            document.getElementById('shipping').textContent = shipping === 0 ? '免運費' : `NT$ ${shipping}`;
            document.getElementById('discount').textContent = discount > 0 ? `- NT$ ${discount}` : 'NT$ 0';
            document.getElementById('total').textContent = `NT$ ${total.toLocaleString()}`;
        }

        // 全選/取消全選
        function toggleSelectAll() {
            const selectAllCheckbox = document.getElementById('select-all');
            const itemCheckboxes = document.querySelectorAll('.cart-item .item-checkbox');
            
            itemCheckboxes.forEach(checkbox => {
                checkbox.checked = selectAllCheckbox.checked;
            });
            
            updateTotal();
        }

        // 刪除單項
        function deleteItem(btn) {
            if (confirm('確定要刪除此商品？')) {
                btn.closest('.cart-item').remove();
                updateTotal();
                checkEmptyCart();
            }
        }

        // 刪除所選
        function deleteSelected() {
            const selected = document.querySelectorAll('.cart-item .item-checkbox:checked');
            if (selected.length === 0) {
                alert('請先選擇要刪除的商品');
                return;
            }
            
            if (confirm(`確定要刪除 ${selected.length} 件商品？`)) {
                selected.forEach(checkbox => {
                    checkbox.closest('.cart-item').remove();
                });
                updateTotal();
                checkEmptyCart();
            }
        }

        // 檢查購物車是否為空
        function checkEmptyCart() {
            const items = document.querySelectorAll('.cart-item');
            if (items.length === 0) {
                document.querySelector('.cart-items').innerHTML = `
                    <div class="empty-cart">
                        <div class="empty-cart-icon">🛒</div>
                        <div class="empty-cart-text">您的購物車是空的</div>
                        <button class="checkout-btn" style="max-width: 300px; margin: 0 auto;" onclick="location.href='index.html'">
                            前往選購
                        </button>
                    </div>
                `;
            }
        }

        // 前往結帳
        function checkout() {
            const selected = document.querySelectorAll('.cart-item .item-checkbox:checked');
            if (selected.length === 0) {
                alert('請先選擇要結帳的商品');
                return;
            }
            alert('即將前往結帳頁面...');
            // 這裡可以導向結帳頁面
            // window.location.href = 'checkout.html';
        }

        // 頁面載入時更新總計
        window.addEventListener('load', () => {
            // 預設全選
            document.getElementById('select-all').checked = true;
            toggleSelectAll();
        });