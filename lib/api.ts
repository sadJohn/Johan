import ky from "ky";

import { BASE_URL } from "./constants";

const api = ky.create({ prefixUrl: BASE_URL });

export default api;
