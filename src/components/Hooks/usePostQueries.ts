import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import {  useGameSession } from "../Hooks/store";

export const usePostGameSession = () => {
    console.log(useGameSession.getState())
    const {isPending, error,isError, isSuccess, mutate} = useMutation({
        mutationFn: () => {
            return axios
                .post('https://manual-improper-cottage.ngrok-free.dev/game-session', useGameSession.getState())
                .then(() => {
                })
        }
    })

    return {isPending, error,isError, isSuccess, mutate}
}
