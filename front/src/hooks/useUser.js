import redaxios from "redaxios";

const useUser = () => {
    const register = async values => {
        delete values.confirmPassword;
        
        const res =  await redaxios
            .post('/api/v1/auth/register', values)
            //.then(res => console.log(res.data))
            .catch(err => console.log(err));

        return res;
    }

    const login = async values => {
        const res = await redaxios
            .post('/api/v1/auth/login', values)
            .catch(err => console.log(err));

        console.log(res);
        return res;
    }

    const logout = async () => {
        return await redaxios
            .get('/api/v1/auth/logout')
            .catch(err => console.log(err));
    }

    const getCurrentUser = async () => {
        const res = await redaxios
            .get('/api/v1/auth')
            .catch(err => console.log(err));

        console.log(res.data);
        return res.data;
    }

    return {
        register,
        login,
        logout,
        getCurrentUser,
    }
}
export default useUser;