import { useMutation } from "@tanstack/react-query";
import { useGameSession, useSessionId } from "../Hooks/store";
import type { ShopTypes } from "../dataTypes";
import instance from "./useAxios";

export const usePostGameSession = () => {
    const updateGameSessionId = useSessionId((state) => state.updateGameSessionId)

    const {isPending, error,isError, isSuccess, mutate} = useMutation({
        mutationFn: () => {
            return instance
                .post<{ id: string }>('/game-session', useGameSession.getState())
                .then((res) => res.data)
        },
        onSuccess: (data) => updateGameSessionId(data.id)
    })

    return {isPending, error,isError, isSuccess, mutate}
}

export const usePostShopSession = () => {
    const updateShopSessionId = useSessionId((state) => state.updateShopSessionId)

    const {isPending, error,isError, isSuccess, mutate} = useMutation({
        mutationFn: (shopId: ShopTypes['id']) => {
            return instance
                .post<{ id: string }>(`/shop/${shopId}/session`)
                .then((res) => res.data)
        },
        onSuccess: (data) => updateShopSessionId(data.id)
    })

    return {isPending, error,isError, isSuccess, mutate}
}

export const useDeleteShopSession = () => {
    const updateShopSessionId = useSessionId((state) => state.updateShopSessionId)

    const {isPending, error,isError, isSuccess, mutate} = useMutation({
        mutationFn: () => instance.delete('/shop-session'),
        onSettled: () => updateShopSessionId(null) // Drop the id even if the request fails.

    })

    return {isPending, error,isError, isSuccess, mutate}
}
