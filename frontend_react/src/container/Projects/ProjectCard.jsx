import React from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink, FiInfo } from 'react-icons/fi';

const cardVariant = {
	hidden: { opacity: 0, y: 20 },
	visible: (i) => ({
		opacity: 1,
		y: 0,
		transition: { delay: i * 0.08 },
	}),
};

const ProjectCard = ({ project, onDetails }) => {
	return (
		<motion.article
			className='project-card'
			custom={0}
			initial='hidden'
			whileInView='visible'
			viewport={{ once: true, amount: 0.2 }}
			variants={cardVariant}
			whileHover={{ scale: 1.03 }}
		>
			<div className='project-image'>
				<img src={project.images?.[0]} alt={project.title} />
			</div>

			<div className='project-body'>
				<h3>{project.title}</h3>
				<p className='project-short'>{project.short}</p>

				<div className='project-actions'>
					<a
						href={project.github}
						target='_blank'
						rel='noopener noreferrer'
						className='btn ghost'
					>
						<FiGithub /> GitHub
					</a>
					<a
						href={project.live}
						target='_blank'
						rel='noopener noreferrer'
						className='btn ghost'
					>
						<FiExternalLink /> Live
					</a>
					<button className='btn primary ' onClick={onDetails}>
						<FiInfo /> Details
					</button>
				</div>
			</div>
		</motion.article>
	);
};

export default ProjectCard;
