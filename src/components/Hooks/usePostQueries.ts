import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useGameSession, useSessionId } from "../Hooks/store";

export const usePostGameSession = () => {
    const updateSessionId = useSessionId((state) => state.updateSessionId)

    const {isPending, error,isError, isSuccess, mutate} = useMutation({
        mutationFn: () => {
            return axios
                .post<{ id: string }>('/game-session', useGameSession.getState())
                .then((res) => res.data)
        },
        onSuccess: (data) => updateSessionId(data.id)
    })

    return {isPending, error,isError, isSuccess, mutate}
}
