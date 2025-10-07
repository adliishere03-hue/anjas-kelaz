import axios from "axios";

export default async function handler(req, res) {
  try {
    const API_KEY = "lCwI0rdz6FJfn2yjWmSQ58NBgpPM14";
    const API_URL = "https://virtusim.com/api/v2/json";

    const params = {
      api_key: API_KEY,
      method: "balance"
    };

    const response = await axios.get(API_URL, { params });
    return res.status(200).json(response.data);

  } catch (err) {
    console.error("Error get_balance:", err.response?.data || err.message);
    return res.status(500).json({ status: "error", message: "Gagal mendapatkan saldo" });
  }
}

export const config = {
  api: { bodyParser: false }
};
