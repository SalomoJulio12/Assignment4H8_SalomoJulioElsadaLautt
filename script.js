document.addEventListener("DOMContentLoaded", function () {
  loadUserData();

  // Menampilkan form edit saat tombol edit di klik
  document.getElementById("editResumeBtn").addEventListener("click", function () {
      toggleEditForm();
  });

  // Simpan data ke localStorage saat form disubmit
  document.getElementById("bottomSection").querySelector("form").addEventListener("submit", function (event) {
      event.preventDefault();
      handleSubmit();
  });
});

// Fungsi untuk memuat data dari localStorage
function loadUserData() {
  const userData = JSON.parse(localStorage.getItem('userData'));

  if (userData) {
      document.querySelector("h2").textContent = userData.name || "Salomo Julio Elsada Lautt";
      document.querySelector("p").textContent = userData.role || "Front End Designer";
      document.getElementById("availabilityInfo").textContent = userData.availability || "Full Time";
      document.getElementById("ageInfo").textContent = userData.age || "21";
      document.getElementById("locationInfo").textContent = userData.location || "Palangka Raya, Kalimantan Tengah, Indonesia";
      document.getElementById("experienceInfo").textContent = userData.experience || "2";
      document.getElementById("emailInfo").textContent = userData.email || "salomojulio0@gmail.com";
  }
}

// Fungsi untuk menampilkan atau menyembunyikan form edit
function toggleEditForm() {
  document.getElementById("bottomSection").classList.toggle("hidden");
}

// Fungsi untuk menangani pengiriman form
function handleSubmit() {
  const name = document.getElementById("name").value;
  const role = document.getElementById("role").value;
  const availability = document.getElementById("availability").value;
  const age = document.getElementById("age").value;
  const location = document.getElementById("location").value;
  const experience = document.getElementById("experience").value;
  const email = document.getElementById("email").value;

  if (!validateForm(name, role, availability, age, location, experience, email)) {
      return;
  }

  if (!validateName(name)) {
      return;
  }

  // Simpan ke localStorage
  const updatedUserData = { name, role, availability, age, location, experience, email };
  localStorage.setItem('userData', JSON.stringify(updatedUserData));

  updateDisplay(updatedUserData);

  // Tampilkan SweetAlert
  Swal.fire({
      icon: 'success',
      title: 'Success!',
      text: 'Data berhasil diperbarui!',
      confirmButtonText: 'OK'
  }).then(() => {
      toggleEditForm();
      document.getElementById("bottomSection").querySelector("form").reset(); //form direset setelah submit
});

// Fungsi untuk memvalidasi form, jika ada field yang kosong, tampilkan pesan error
function validateForm(name, role, availability, age, location, experience, email) {
  if (!name || !role || !availability || !age || !location || !experience || !email) {
      Swal.fire({
          icon: 'warning',
          title: 'Tolong Isi Form dengan Benar',
          text: 'Semua field harus diisi!',
          confirmButtonText: 'OK'
      });
      return false;
  }
  return true;
}

// Fungsi untuk memvalidasi nama, tidak boleh menggunakan angka dan simbol
function validateName(name) {
  const nameRegex = /^[A-Za-z\s]+$/;
  if (!nameRegex.test(name)) {
      Swal.fire({
          icon: 'warning',
          title: 'Nama Tidak Valid',
          text: 'Nama tidak boleh menggunakan angka, nomor, dan simbol.',
          confirmButtonText: 'OK'
      });
      return false;
  }
  return true;
}

// Fungsi untuk memperbarui tampilan data
function updateDisplay(updatedUserData) {
  document.querySelector("h2").textContent = updatedUserData.name;
  document.querySelector("p").textContent = updatedUserData.role;
  document.getElementById("availabilityInfo").textContent = updatedUserData.availability;
  document.getElementById("ageInfo").textContent = updatedUserData.age;
  document.getElementById("locationInfo").textContent = updatedUserData.location;
  document.getElementById("experienceInfo").textContent = updatedUserData.experience;
  document.getElementById("emailInfo").textContent = updatedUserData.email;
}}