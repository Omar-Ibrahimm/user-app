document.addEventListener('DOMContentLoaded', () => {
    const userForm = document.getElementById('userForm');
    const userTable = document.getElementById('userTable').getElementsByTagName('tbody')[0];

    // Fetch and display users
    fetchUsers();

    // Add user
    userForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const id = parseInt(document.getElementById('id').value);

        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, id })
        })
        .then(response => response.json())
        .then(() => {
            fetchUsers();
            userForm.reset();
        });
    });

    // Fetch users from backend
    function fetchUsers() {
        fetch('http://localhost:5000/users')
            .then(response => response.json())
            .then(users => {
                userTable.innerHTML = ''; // Clear table
                users.forEach(user => {
                    const row = userTable.insertRow();
                    row.insertCell().textContent = user.name;
                    row.insertCell().textContent = user.id;
                    const deleteCell = row.insertCell();
                    const deleteButton = document.createElement('button');
                    deleteButton.textContent = 'Delete';
                    deleteButton.addEventListener('click', () => deleteUser(user.id));
                    deleteCell.appendChild(deleteButton);
                });
            });
    }

    // Delete user
    function deleteUser(userId) {
        fetch(`http://localhost:5000/users/${userId}`, { method: 'DELETE' })
            .then(response => response.json())
            .then(() => fetchUsers());
    }
});