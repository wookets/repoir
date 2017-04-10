import colors from 'colors';
import { table } from 'table';

export default (program, results) => {
	const problems = getProblems(results);

	if (problems.length === 0) {
		write(colors.green(colors.bold('✔ No problems were detected with your repo')));
	} else {
		write(colors.red(`\n${colors.bold('✘ Problems with your repo were detected:')}\n`));

		const data = problems.map(({ plugin, message }) => {
			return [colors.gray(plugin), message];
		});

		write(`\n${table(data)}\n`);
	}
};

function write (message = '') {
	process.stderr.write(message);
}

function getProblems (results) {
	let problems = [];

	results.forEach(result => {
		problems = problems.concat(result.problems.map(problem => {
			problem.plugin = result.plugin;
			return problem;
		}));
	});

	return problems;
}
