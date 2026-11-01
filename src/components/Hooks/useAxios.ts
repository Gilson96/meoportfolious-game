import axios from "axios";
import { useSessionId } from "../Hooks/store";

const instance = axios.create({
  baseURL: "/api",
  timeout: 0,
});

instance.interceptors.request.use((config) => {
  const { gameSessionId, shopSessionId } = useSessionId.getState()

  if (gameSessionId) config.headers.set('X-Game-Session', gameSessionId)
  if (shopSessionId) config.headers.set('X-Shop-Session', shopSessionId)
  return config
})

export default instance