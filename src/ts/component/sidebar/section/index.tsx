import * as React from 'react';
import { observer } from 'mobx-react';
import { I, U } from 'Lib';

import TypeTitle from './type/title';
import TypeLayout from './type/layout';
import TypeRelation from './type/relation';

import ObjectRelation from './object/relation';

const Components = {
	'type/title': TypeTitle,
	'type/layout': TypeLayout,
	'type/relation': TypeRelation,

	'object/relation': ObjectRelation,
};

interface Props extends I.SidebarSectionComponent {
	component: string;
	withState?: boolean;
};

interface State {
	object: any;
};

const SidebarSectionIndex = observer(class SidebarSectionIndex extends React.Component<Props, State> {
	
	state = {
		object: null,
	};
	ref = null;

    render () {
		const { component } = this.props;
		const object = this.getObject();
		const Component = Components[component];
		const cn = [ 'section', U.Common.toCamelCase(component.replace(/\//g, '-')) ];
		const readonly = this.isReadonly();

		if (!object) {
			return null;
		};

        return (
			<div className={cn.join(' ')}>
				{Component ? (
					<Component 
						ref={ref => this.ref = ref} 
						{...this.props} 
						object={object} 
						readonly={readonly}
					/> 
				): component}
			</div>
		);
    };

	componentDidMount (): void {
		const { withState } = this.props;

		if (withState) {
			this.setObject(this.props.object);
		};
	};

	getObject (): any {
		return this.state.object || this.props.object;
	};

	setObject (object: any): void {
		this.setState({ object }, () => this.ref?.forceUpdate());
	};

	isReadonly (): boolean {
		const { readonly } = this.props;
		const object = this.getObject();

		return readonly || object?.isArchived;
	};

});

export default SidebarSectionIndex;