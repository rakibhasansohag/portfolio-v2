import React, { useState, useEffect } from 'react';

import { FaPhone, FaEnvelope } from 'react-icons/fa';
import { FaGithub, FaFacebook } from 'react-icons/fa';
import './Phone.scss';
import Rakib from '../../assets/rakib-wave.svg';

export const Phone = () => {
	const initialMessage = 'Hello There, Stranger!';
	const [message, setMessage] = useState(initialMessage);
	const [isChatActive, setIsChatActive] = useState(false);

	// will add future
	const handleChatToggle = () => {
		console.log('beforeChatToggle', isChatActive);
		setIsChatActive(!isChatActive);
		console.log('after chat toggle', isChatActive);
	};

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			setMessage(initialMessage);
		}, 30000);

		return () => clearTimeout(timeoutId);
	}, [message, initialMessage]);

	return (
		<div
			id='phone'
			className={`overlay${isChatActive ? ' is-chat-active' : ''}`}
		>
			<div className='inner-skin'>
				<div className='phone-top phone-left'>
					<div className='phone-icons'>
						<a href='tel:+880 176016 9982' className='phone-icon'>
							<FaPhone />
						</a>

						<a
							href='mailto:rakibhasansohag133@gmail.com'
							className='envelope-icon'
						>
							<FaEnvelope />
						</a>
					</div>
				</div>

				<div className='phone-top phone-right'>
					<div className='phone-icons'>
						<a
							href='https://github.com/devoloper-rakib'
							target='_blank'
							rel='noopener noreferrer'
							className='github-icon'
						>
							<FaGithub className='phone-icon' />
						</a>

						<a
							href='https://www.facebook.com/RakibHasanSohag133'
							target='_blank'
							rel='noopener noreferrer'
							className='facebook-icon'
						>
							<FaFacebook className='envelope-icon' />
						</a>
					</div>
				</div>

				<div className='phone-content'>
					<h1 className='title'>{message}</h1>
					<img className='bounce' src={Rakib} alt='rakib svg' />
					<h2 className='subtitle'>Let&apos;s Talk ...</h2>

					{/* <a href='#about' onClick={handleChatToggle}>
						contact me
					</a> */}
				</div>
			</div>
		</div>
	);
};
