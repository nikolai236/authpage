import React from "react";
import useForms from "../hooks/useForms";
import { useAuth } from "./AuthProvider";

export default function Login() {
    const { values, handleChange } = useForms({
        initialValues: {
            email: '',
            password: '',
        }
    });
    const { error, loading, loginUser } = useAuth();

    const handleSubmit = async (e) => {
        if(!error) {
            e.preventDefault();

            await loginUser(values);
        }
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>email</label>
                    <input
                        type="text"
                        name="email"
                        onChange={handleChange}
                        value={values.email}
                    />
                </div>
                <div>
                    <label>password</label>
                    <input
                        type="password"
                        name="password"
                        onChange={handleChange}
                        value={values.password}
                    />
                </div>
            <input type="submit" value="Submit" />
            </form>
        </div>
    )
}