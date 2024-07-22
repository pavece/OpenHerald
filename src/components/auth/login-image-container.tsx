import { PiInfo } from 'react-icons/pi';
import { NavBar } from './nav-bar';

export const LoginImageContainer = () => {
	return (
		<div
			className='w-full h-screen bg-center bg-cover bg-no-repeat hidden lg:block'
			style={{ backgroundImage: "url('/images/login-image.jpg')" }}
		>
			<div className='flex justify-between flex-col w-full h-screen bg-gradient-to-b from-zinc-800/10 to-zinc-900/60'>
				<NavBar />
				<div className='text-neutral-100 p-8 flex items-center gap-4'>
					<PiInfo size={32} />
					<p>Only registered editors and site administrators can use this login.</p>
				</div>
			</div>
		</div>
	);
};
