// Helper fetch function
async function apiPost(path, body) {
  const resp = await fetch(path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  return resp.json();
}

async function apiGet(path) {
  const resp = await fetch(path);
  return resp.json();
}

// Cek saldo
document.getElementById("btnBalance").onclick = async () => {
  const out = document.getElementById("balanceOutput");
  out.innerText = "Memuat...";
  const data = await apiGet("/api/get_balance");
  out.innerText = JSON.stringify(data, null, 2);
};

// Daftar harga
document.getElementById("btnPrice").onclick = async () => {
  const out = document.getElementById("priceOutput");
  out.innerText = "Memuat...";
  const data = await apiGet("/api/get_price");
  out.innerText = JSON.stringify(data, null, 2);
};

// Daftar layanan
document.getElementById("btnServices").onclick = async () => {
  const out = document.getElementById("serviceOutput");
  out.innerText = "Memuat...";
  const data = await apiGet("/api/get_services");
  out.innerText = JSON.stringify(data, null, 2);

  // isi select options layanan & negara
  if (data.services && data.countries) {
    const selServ = document.getElementById("service");
    const selCountry = document.getElementById("country");
    selServ.innerHTML = "";
    selCountry.innerHTML = "";
    data.services.forEach(s => {
      const opt = document.createElement("option");
      opt.value = s;
      opt.textContent = s;
      selServ.append(opt);
    });
    data.countries.forEach(c => {
      const opt = document.createElement("option");
      opt.value = c;
      opt.textContent = c;
      selCountry.append(opt);
    });
  }
};

// Order nomor
document.getElementById("buyForm").onsubmit = async (e) => {
  e.preventDefault();
  const country = document.getElementById("country").value;
  const service = document.getElementById("service").value;
  const out = document.getElementById("orderOutput");
  out.innerText = "Memproses order...";
  const data = await apiPost("/api/get_number", { country, service });
  out.innerText = JSON.stringify(data, null, 2);
};

// Cek SMS / OTP
document.getElementById("btnCheckSms").onclick = async () => {
  const order_id = document.getElementById("orderIdForSms").value;
  const out = document.getElementById("smsOutput");
  out.innerText = "Mengambil...";
  const data = await apiPost("/api/check_sms", { order_id });
  out.innerText = JSON.stringify(data, null, 2);
};

// Batal order
document.getElementById("btnCancel").onclick = async () => {
  const order_id = document.getElementById("orderIdCancel").value;
  const out = document.getElementById("cancelOutput");
  out.innerText = "Memproses pembatalan...";
  const data = await apiPost("/api/cancel_order", { order_id });
  out.innerText = JSON.stringify(data, null, 2);
};

// Riwayat order
document.getElementById("btnHistory").onclick = async () => {
  const out = document.getElementById("historyOutput");
  out.innerText = "Memuat riwayat...";
  const data = await apiGet("/api/history");
  out.innerText = JSON.stringify(data, null, 2);
};
