import { useQuery } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import type { GameSessionInventoryTypes, GameSessionTypes, ItemTypes, ShopTypes } from "../dataTypes";
import { useSessionId } from "./store";
import instance from "./useAxios";

const toProxyPath = (url: string) => new URL(url, window.location.origin).pathname;

// export const useGetItem = (itemId: number) => {
//   const { isLoading, isFetching, error, data, isError } = useQuery<ItemTypes>({
//     queryKey: ["item", itemId],
//     queryFn: () =>
//       axios
//         .get(
//           `/item/${itemId}`, {
//         }
//         )
//         .then((res) => {
//           const item: ItemTypes = {
//             ...res.data,
//             textureURL: toProxyPath(res.data.textureURL),
//             atlasURL: toProxyPath(res.data.atlasURL),
//           };

//           const {
//             updateShop_id,
//             updateExternal_variant_id,
//             updateSprite_key,
//             updateTextureURL,
//             updateAtlasURL,
//             updateActive,
//           } = useItem.getState()

//           updateShop_id(item.shop_id)
//           updateExternal_variant_id(item.external_variant_id)
//           updateSprite_key(item.sprite_key)
//           updateTextureURL(item.textureURL)
//           updateAtlasURL(item.atlasURL)
//           updateActive(item.active)

//           return item;
//         })
//   });

//   return { isLoading, isFetching, error, item: data, isError };
// };

export const useGetGameSession = () => {
  const gameSessionId = useSessionId((state) => state.gameSessionId) ?? ''

  const { isLoading, isFetching, error, data, isError } = useQuery<GameSessionTypes & GameSessionInventoryTypes>({
    queryKey: ["gameSession", gameSessionId],
    queryFn: () =>
      instance.get(`/game-session`).then((res) => ({
        ...res.data,
        inventory: res.data.inventory.map((item: ItemTypes) => ({
          ...item,
          textureURL: toProxyPath(item.textureURL),
          atlasURL: toProxyPath(item.atlasURL),
        })),
      })),
    enabled: !!gameSessionId,
  });

  return { isLoading, isFetching, error, gameSession: data, isError };
};

export const useGetShop = () => {
  const { isLoading, isFetching, error, data, isError } = useQuery<ShopTypes[]>({
    queryKey: ["shop"],
    queryFn: () =>
      instance.get(`/shop`).then((res) =>
        res.data.map((shop: ShopTypes) => ({
          ...shop,
          textureURL: toProxyPath(shop.textureURL),
          atlasURL: toProxyPath(shop.atlasURL),
        }))
      ),
  });

  return { isLoading, isFetching, error, shops: data, isError };
};

