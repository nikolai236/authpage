import React from 'react';
import useForms from '../hooks/useForms';
import AppError from './AppError';
import { useAuth } from './AuthProvider';
import validate from '../hooks/useValidate';

export default function Register() {
    const { values, handleChange } = useForms(
        {
            initialValues: {
                username: '',
                email: '',
                password: '',
                confirmPassword: '',
            }
        }
    );

    const { error, loading, registerUser } = useAuth();

    const displayError = () => {
        if(error) {
            return <AppError message='App Error' />
        }
    }

    const handleSubmit = async e => {
        if(validate(values)) {
            e.preventDefault();

            await registerUser(values);
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                {
                    displayError()
                }
                <div>
                    <label>username</label>
                    <input
                        type="text"
                        name="username"
                        onChange={handleChange}
                        value={values.username}
                    />
                </div>
                {
                    // error && <AppError message={error.message} />
                }
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
                        type="text"
                        name="password"
                        onChange={handleChange}
                        value={values.password}
                    />
                </div>
                <div>
                    <label>confirm password</label>
                    <input
                        type="text"
                        name="confirmPassword"
                        onChange={handleChange}
                        value={values.confirmPassword}
                    />
                </div>
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}