import React, { useCallback } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { logout } from '../redux/Slices/authSlice';
import { useNavigate } from "react-router-dom";

const useFetch = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.auth.user)
    const navigateTo = useNavigate()

    const fetchWrapper = useCallback(async (apiCall, ...params) => {

        let updateParams = [...params]
        if (user) updateParams = [...params, user.token]

        const { data, response } = await apiCall(...updateParams)
        if (response && !response.ok) {
            if (response.status === 401) {
                dispatch(logout())
                navigateTo("/login")
            }
        }
        return { data, response }
    }, [user])


    return fetchWrapper
}

export default useFetch