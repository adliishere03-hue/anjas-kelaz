import axios from "axios";

export default async function handler(req, res) {
  try {
    const { country, service } = req.body;

    if (!country || !service) {
      return res.status(400).json({ status: "error", message: "country & service diperlukan" });
    }

    const API_KEY = "lCwI0rdz6FJfn2yjWmSQ58NBgpPM14";
    const API_URL = "https://virtusim.com/api/v2/json";

    const params = {
      api_key: API_KEY,
      method: "order",       // mungkin “order” atau “get_number” tergantung dokumentasi
      country,
      service
    };

    const response = await axios.get(API_URL, { params });
    return res.status(200).json(response.data);

  } catch (err) {
    console.error("Error get_number:", err.response?.data || err.message);
    return res.status(500).json({ status: "error", message: "Gagal order nomor", detail: err.message });
  }
}

export const config = {
  api: { bodyParser: true }
};
