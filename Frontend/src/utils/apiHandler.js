export const getAllChats = async () => {
    const baseURL = import.meta.env.VITE_BASE_URL; // Adjust to match your backend server URL
    const token = sessionStorage.getItem("token")
    try {
        const response = await fetch(`${baseURL}/chat/getallchats`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        const data = await response.json();
        return data.chats;
    } catch (error) {
        console.log(error.message);
    }
};

export const signup = async (formData) => {
    const baseURL = import.meta.env.VITE_BASE_URL;
    try {
        const response = await fetch(`${baseURL}/user/signup`, {
            method: 'POST',
            body: formData
        });

        const data = await response.json();
        if (!response.ok) {
            console.log(data.message);
        }
        if (response.ok) sessionStorage.setItem("token", data.user.token);
        return { data, response };
    } catch (error) {
        console.log(error.message);
    }
}

export const login = async (userData) => {
    const baseURL = import.meta.env.VITE_BASE_URL;
    try {
        const response = await fetch(`${baseURL}/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        const data = await response.json();
        if (!response.ok) {
            console.log(data.message);
        }
        if (response.ok) sessionStorage.setItem("token", data.user.token);
        return { data, response };
    } catch (error) {
        console.log(error.message);
    }
};

export const getChatById = async (chatId) => {
    const baseURL = import.meta.env.VITE_BASE_URL;
    const token = sessionStorage.getItem("token")
    try {
        const response = await fetch(`${baseURL}/chat/getchat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(chatId)
        });

        if (!response.ok) {
            return { data: {}, response }
        }
        const data = await response.json()
        return { data, response };
    } catch (error) {
        console.log(error.message);
    }
}

export const getChatMessagae = async (chatDetails) => {
    const baseURL = import.meta.env.VITE_BASE_URL; // Adjust to match your backend server URL
    const token = sessionStorage.getItem("token")
    try {
        const response = await fetch(`${baseURL}/chat/getchatmessages`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(chatDetails)
        });

        const data = await response.json();
        return { data, response };
    } catch (error) {
        console.log(error.message);
    }
}

export const sendMessage = async (chatMessage) => {
    const baseURL = import.meta.env.VITE_BASE_URL; // Adjust to match your backend server URL
    const token = sessionStorage.getItem("token")
    try {
        const response = await fetch(`${baseURL}/chat/sendchatmessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(chatMessage)
        });

        const data = await response.json();
        return { data, response };
    } catch (error) {
        console.log(error.message);
    }
}

export const reAuth = async (token) => {
    const baseURL = import.meta.env.VITE_BASE_URL;
    try {
        const response = await fetch(`${baseURL}/user/reauth`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(token)
        });

        const data = await response.json();
        if (!response.ok) {
            console.log(data.message);
        }
        return { data, response };
    } catch (error) {
        console.log(error.message);
    }
}