import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { ItemTypes } from "../dataTypes";
import { useItem } from "./store";

// "http://localhost:8000/meoportfolious-assets/x.png" -> "/meoportfolious-assets/x.png",
// so the file loads through the Vite proxy on the game's own origin
const toProxyPath = (url: string) => new URL(url, window.location.origin).pathname;

export const useGetItem = (itemId: number) => {
  const { isLoading, isFetching, error, data, isError } = useQuery<ItemTypes>({
    queryKey: ["item", itemId],
    queryFn: () =>
      axios
        .get(
          `https://manual-improper-cottage.ngrok-free.dev/item/${itemId}`,{
          }
        )
        .then((res) => {
          const item: ItemTypes = {
            ...res.data,
            textureURL: toProxyPath(res.data.textureURL),
            atlasURL: toProxyPath(res.data.atlasURL),
          };

          const {
            updateShop_id,
            updateExternal_variant_id,
            updateSprite_key,
            updateTextureURL,
            updateAtlasURL,
            updateActive,
          } = useItem.getState()

          updateShop_id(item.shop_id)
          updateExternal_variant_id(item.external_variant_id)
          updateSprite_key(item.sprite_key)
          updateTextureURL(item.textureURL)
          updateAtlasURL(item.atlasURL)
          updateActive(item.active)

          return item;
        })
  });

  return { isLoading, isFetching, error, item: data, isError };
};
