import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { images } from '../../constants';
import './Header.scss';
import AppWrap from '../../wrapper/AppWrap';

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

const words = ['Front-End Developer', 'Back-End Developer', 'Problem Solver'];

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

	return (
		<div className='app__header app__flex'>
			<motion.div
				whileInView={{ x: [-100, 0], opacity: [0, 1] }}
				transition={{ duration: 0.5 }}
				className='app__header-info'
			>
				<span>
					HELLO 👋, I'M <br />
				</span>
				<h2> Rakib Hasan Sohag </h2>
				<p>A highly skilled {words[currentWordIndex]}.</p>
			</motion.div>
			{/* 
			<motion.div
				whileInView={{ opacity: [0, 1] }}
				transition={{ duration: 0.5, delayChildren: 0.5 }}
				className='app__header-img'
			>
			</motion.div> */}
			{/* ... Your image content ... */}

			<motion.div
				className='app__header-circles'
				variant={scaleVariants}
				whileInView={scaleVariants.whileInView}
			>
				{[images.redux, images.react, images.sass].map((circle, index) => (
					<div className='circle-cmp app__flex' key={`circle-${index}`}>
						<img src={circle} alt='circle' />
					</div>
				))}
			</motion.div>
		</div>
	);
};

export default AppWrap(Header, 'home');
