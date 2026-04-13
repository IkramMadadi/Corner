import ejs from 'ejs';

import { existsSync } from 'node:fs';
import path from 'node:path';
import { readTextFile } from '../frontend/File';
const templates = path.resolve(path.join(process.cwd(), './common/templates'));

if (!existsSync(templates)) throw new Error('Could not find templates');

export default class EjsTemplate<T extends CustomerEmailTemplates = CustomerEmailTemplates> {
	public name: CustomerEmailTemplates;
	public template: Promise<string | undefined>;
	public additionalContext: ExtraAdditionalContext;

	constructor(name: T, additionalContext: ExtraAdditionalContext) {
		this.name = name;
		this.additionalContext = additionalContext;
		this.template = this.loadTemplate();
		this.template
			.then(() => console.info(`📝 Template '${name}' is ready`))
			.catch(error => {
				console.error(`📝 Error in Template ${name} ${error}`);
			});
	}
	public async loadTemplate() {
		return readTextFile(path.join(templates, `${this.name}.ejs`));
	}
	public async render(context: CustomerEmailContexts[T]) {
		return this.template.then(template => {
			if (!template) throw new Error("couldn't render template because it couldn't be loaded before");
			return ejs.render(template, { ...this.additionalContext, ...context });
		});
	}
}
