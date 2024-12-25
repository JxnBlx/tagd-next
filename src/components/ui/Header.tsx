import globalConfig from "../../../globalconfig";
export default function Header() {
	return (
		<header>
			<nav>
				{/* <li>
					<a href={globalConfig.pages.home}>Home</a>
				</li> */}
				<li>
					<a href={globalConfig.pages.account}>Account</a>
				</li>
				<li>
					<a href={globalConfig.pages.login}>Login</a>
				</li>
				<li>
					<a href={globalConfig.pages.signup}>Sign Up</a>
				</li>
			</nav>
		</header>
	);
}
