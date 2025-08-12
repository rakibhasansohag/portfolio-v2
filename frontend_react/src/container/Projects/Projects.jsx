import React, { useState, useEffect } from 'react';
import projectsData from '../../data/projects';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';

import './Projects.scss';
import { AppWrap, MotionWrap } from '../../wrapper';

function Projects() {
	const [projects] = useState(projectsData.slice(0, 4));
	const [selected, setSelected] = useState(null);

	useEffect(() => {
		projects.forEach((p) => {
			const img = new Image();
			img.src = p.image;
		});
	}, [projects]);

	return (
		<section className='projects-section'>
			<h2 className='head-text mb'>
				MY Creative <span>Project</span> Station<span>.</span>
			</h2>

			<div className='projects-grid '>
				{projects.map((p) => (
					<ProjectCard
						key={p.id}
						project={p}
						onDetails={() => setSelected(p)}
					/>
				))}
			</div>

			<ProjectModal project={selected} onClose={() => setSelected(null)} />
		</section>
	);
}

export default AppWrap(
	MotionWrap(Projects, 'app__projects'),
	'projects',
	'app__primarybg',
);
