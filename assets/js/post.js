document.querySelectorAll('.formatted-date').forEach(dateDiv => {
    const rawDate = new Date(dateDiv.dataset.date); // อ่านค่า raw date จาก data attribute
    const options = {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    };
    const formattedDate = rawDate.toLocaleDateString('en-US', options).replace(',', '');
    dateDiv.textContent = formattedDate; // อัพเดตข้อความ
  });