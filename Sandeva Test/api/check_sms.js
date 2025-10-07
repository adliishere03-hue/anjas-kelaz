import axios from "axios";

export default async function handler(req, res) {
  try {
    const { order_id } = req.body;
    if (!order_id) {
      return res.status(400).json({ status: "error", message: "order_id diperlukan" });
    }

    const API_KEY = "lCwI0rdz6FJfn2yjWmSQ58NBgpPM14";
    const API_URL = "https://virtusim.com/api/v2/json";

    const params = {
      api_key: API_KEY,
      method: "get_sms",
      id: order_id
    };

    const response = await axios.get(API_URL, { params });
    return res.status(200).json(response.data);

  } catch (err) {
    console.error("Error check_sms:", err.response?.data || err.message);
    return res.status(500).json({ status: "error", message: "Gagal cek SMS", detail: err.message });
  }
}

export const config = {
  api: { bodyParser: true }
};
