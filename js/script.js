document.addEventListener('DOMContentLoaded', function() {
    const transactionForm = document.getElementById('transaction-form');
    const transactionTableBody = document.getElementById('transaction-body');
    const totalBalanceElement = document.getElementById('total-balance');

    // Fungsi untuk mengambil dan menampilkan transaksi
    function fetchTransactions() {
        fetch('backend/get_transactions.php')
            .then(response => response.json())
            .then(data => {
                console.log("Response dari get_transactions.php:", data); // Log response
                if (data && data.status === true && data.data && Array.isArray(data.data)) {
                   transactionTableBody.innerHTML = '';
                   let totalBalance = 0;
                     data.data.forEach(transaction => {
                        const row = document.createElement('tr');
                        const amount = parseFloat(transaction.amount);
                        const formattedAmount = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount)
                        const formattedDate = new Date(transaction.transaction_date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
                        row.innerHTML = `
                            <td>${transaction.type === 'deposit' ? 'Deposit' : 'Penarikan'}</td>
                            <td>${formattedAmount}</td>
                            <td>${transaction.name}</td>
                            <td>${formattedDate}</td>
                            <td>
                               <div class="action-buttons">
                               <button class="delete-button" data-id="${transaction.id}">Hapus</button>
                               </div>
                            </td>
                        `;

                        transactionTableBody.appendChild(row);
                        if (transaction.type === 'deposit') {
                            totalBalance += amount;
                        } else {
                            totalBalance -= amount;
                        }
                    });

                    totalBalanceElement.textContent = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(totalBalance);
                     addDeleteButtonListeners();
                  }else{
                     console.error("Gagal memuat transaksi atau response tidak valid:", data);
                   }
            })
            .catch(error => console.error('Error fetching transactions:', error));
    }


    // Tambahkan event listener ke tombol hapus
    function addDeleteButtonListeners() {
        const deleteButtons = document.querySelectorAll('.delete-button');
        deleteButtons.forEach(button => {
            button.addEventListener('click', function() {
                const transactionId = this.getAttribute('data-id');
                deleteTransaction(transactionId);
            });
        });
    }
    // Fungsi untuk menghapus transaksi
    function deleteTransaction(id) {
        if (confirm("Anda yakin ingin menghapus transaksi ini?")) {
            fetch('backend/delete_transaction.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: 'id=' + id,
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Transaksi berhasil dihapus.');
                    fetchTransactions();
                } else {
                    alert('Berhasil!, Refresh Pagenya!');
                }
            })
            .catch(error => console.error('Error:', error));
        }
    }

    // Event listener untuk form submit
    transactionForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const type = document.getElementById('type').value;
        const amount = document.getElementById('amount').value;
        const name = document.getElementById('description').value;

        fetch('backend/add_transaction.php', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
             body: `type=${type}&amount=${amount}&name=${name}`
        })
             .then(response => {
                console.log("Response dari add_transaction.php:", response); // Log response
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                   }
                 return response.json();
            })
            .then(data => {
                console.log("JSON data:", data)
                if (data.success) {
                    alert('Transaksi berhasil ditambahkan.');
                    transactionForm.reset();
                    fetchTransactions();
                } else {
                  alert('Berhasil!, Refresh Pagenya!');
                }
            })
             .catch(error => {
              console.error('Fetch error:', error);
              alert('Terjadi kesalahan saat menambahkan transaksi, periksa console');
            });
    });

    // Memuat data transaksi saat halaman pertama kali dimuat
    fetchTransactions();
});