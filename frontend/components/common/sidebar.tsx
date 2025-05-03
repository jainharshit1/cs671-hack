import React from 'react';

const Sidebar = () => {
	return (
		<div className="flex flex-col px-5 py-24 justify-between">
			<div className="flex flex-col gap-5">
				<div className="w-16 aspect-square rounded-full bg-zinc-600"></div>
				<div className="w-16 mt-12 aspect-square rounded-full bg-zinc-600"></div>
				<div className="w-16 aspect-square rounded-full bg-zinc-600"></div>
				<div className="w-16 aspect-square rounded-full bg-zinc-600"></div>
			</div>
			<div className="w-16 aspect-square rounded-full bg-zinc-600"></div>
		</div>
	);
};

export default Sidebar;
