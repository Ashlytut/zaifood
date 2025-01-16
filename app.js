document.addEventListener('DOMContentLoaded', () => {
    const adminButton = document.getElementById('adminButton');
    const userButton = document.getElementById('userButton');
    const logoutButton = document.getElementById('logoutButton');
    const orderButtons = document.querySelectorAll('.orderButton');
    const ordersList = document.getElementById('ordersList');

    // Event listener for admin button
    if (adminButton) {
        adminButton.addEventListener('click', () => {
            // Save admin role to localStorage and redirect
            localStorage.setItem('role', 'admin');
            window.location.href = 'admin_dashboard.html';
        });
    }

    // Event listener for user button
    if (userButton) {
        userButton.addEventListener('click', () => {
            // Save user role to localStorage and redirect
            localStorage.setItem('role', 'user');
            window.location.href = 'user_dashboard.html';
        });
    }

    // Event listener for logout button
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            // Clear localStorage and redirect to home page
            localStorage.removeItem('role');
            window.location.href = 'index.html';
        });
    }

    // Event listener for order buttons
    if (orderButtons) {
        orderButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const item = e.target.dataset.item;
                // Save the new order to localStorage
                let orders = JSON.parse(localStorage.getItem('orders')) || [];
                orders.push(`Order for ${item} placed at ${new Date().toLocaleString()}`);
                localStorage.setItem('orders', JSON.stringify(orders));
                alert(`Order for ${item} placed successfully!`);
            });
        });
    }

    // Populate orders list on admin dashboard
    if (ordersList) {
        // Load orders from localStorage
        let orders = JSON.parse(localStorage.getItem('orders')) || [];
        orders.forEach(order => {
            let li = document.createElement('li');
            li.textContent = order;
            ordersList.appendChild(li);
        });
    }

    // Redirect to correct dashboard if already logged in
    const role = localStorage.getItem('role');
    if (role === 'admin' && window.location.pathname !== '/admin_dashboard.html') {
        window.location.href = 'admin_dashboard.html';
    } else if (role === 'user' && window.location.pathname !== '/user_dashboard.html') {
        window.location.href = 'user_dashboard.html';
    } else if (!role && window.location.pathname !== '/index.html') {
        window.location.href = 'index.html';
    }
});
