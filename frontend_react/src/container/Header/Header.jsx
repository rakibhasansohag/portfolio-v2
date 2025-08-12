import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Header.scss';

import AppWrap from '../../wrapper/AppWrap';

import { renderCanvas } from './renderCanvas';
import { Phone } from './Phone';
import AnimatedWord from '../../components/AnimatedWord';

const scaleVariants = {
	whileInView: {
		scale: [0, 1],
		opacity: [0, 1],
		transition: {
			duration: 1,
			ease: 'easeInOut',
		},
	},
};

const words = [
	{ text: 'Front-End Developer', color: '#068FFF' },
	{ text: 'Back-End Developer', color: '#8E1616' }, // al right
	{ text: 'Problem Solver', color: '#123458' },
];

const Header = () => {
	const [currentWordIndex, setCurrentWordIndex] = useState(0);

	useEffect(() => {
		const intervalId = setInterval(() => {
			setCurrentWordIndex((prevIndex) =>
				prevIndex === words.length - 1 ? 0 : prevIndex + 1,
			);
		}, 3000);

		return () => clearInterval(intervalId);
	}, []);

	useEffect(() => {
		renderCanvas();
	}, []);

	return (
		<div className='app__header app__flex'>
			<motion.div
				whileInView={{ x: [-100, 0], opacity: [0, 1] }}
				transition={{ duration: 0.5 }}
				className='app__header-info'
			>
				<span>
					HELLO
					<motion.div
						className='hello'
						role='img'
						aria-label='Waving Hand'
						animate={{ rotate: [0, -20, 0, 20, 0], scale: [1, 1.2, 1, 1.2, 1] }}
						transition={{ duration: 1.5, repeat: Infinity, repeatType: 'loop' }}
					>
						👋
					</motion.div>
					, I'M <br />
				</span>
				<h2> Rakib Hasan Sohag </h2>
				<p>
					A highly skilled{' '}
					<AnimatedWord
						text={words[currentWordIndex].text}
						color={words[currentWordIndex].color}
					/>
					.
				</p>

				<motion.a
					href='https://drive.google.com/file/d/1oULu37JYveYo4nl5Fldid0TKwW4TsWPr/view?usp=drive_link'
					target='_blank'
					rel='noopener noreferrer'
					className='resume-btn'
				>
					View Resume
				</motion.a>
			</motion.div>

			<motion.div
				className='app__header-phone'
				variant={scaleVariants}
				whileInView={scaleVariants.whileInView}
			>
				<Phone />
			</motion.div>
			<canvas id='canvas'></canvas>
		</div>
	);
};

export default AppWrap(Header, 'home');
