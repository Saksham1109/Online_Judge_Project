import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../api/axios";
 import styles from './styles.module.css';
 import {useAuth} from '..//../context/AuthProvider';


const LOGIN_URL='/user/login';

const Login = () => {
	const {login} = useAuth();
	const [data, setData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		console.log("login",e.target);
		e.preventDefault();
		try {
			const { data: res } = await axios.post(LOGIN_URL, data,
				{
					headers:{'Content-Type':'application/json'},
					// withCredentials:true
				});
				const token =res?.token;
				console.log(1);
				login(res.token,res.userId);
				console.log(2);
				
				sessionStorage.setItem("role",res.role);
				window.location = "/";
				
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
			else
			{
				setError('No server Response');
			}
		}
	};

	return (
		<div className={styles.login_container}>
			<div className={styles.login_form_container}>
				<div className={styles.left}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h1>Login to Your Account</h1>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className={styles.input}
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className={styles.input}
						/>
						{error && <div className={styles.error_msg}>{error}</div>}
						<button type="submit" className={styles.green_btn}>
							Sing In
						</button>
						please change the site settings to allow insecure data, to access the website
					</form>
				</div>
				<div className={styles.right}>
					<h1>New Here ?</h1>
					<Link to="/signup">
						<button type="button" className={styles.white_btn}>
							Sing Up
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Login;