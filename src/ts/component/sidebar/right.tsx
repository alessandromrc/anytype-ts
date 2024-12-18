import * as React from 'react';
import { observer } from 'mobx-react';
import { U, S, keyboard } from 'Lib';

import PageType from './page/type';
import PageObjectRelation from './page/object/relation';

interface Props {
	isPopup?: boolean;
};

interface State {
	page: string;
	rootId: string;
	details: any;
};

const Components = {
	'type': PageType,
	'object/relation': PageObjectRelation,
};

const SidebarRight = observer(class SidebarRight extends React.Component<Props, State> {
	
	node = null;
	refChild = null;
	state = {
		page: '',
		rootId: '',
		details: {},
	};

    render() {
		const { isPopup } = this.props;
		const showSidebarRight = S.Common.getShowSidebarRight(isPopup);
		const { page, rootId, details } = this.state;

		if (!showSidebarRight) {
			return null;
		};

		const Component = Components[page];
		const cn = [ 'sidebarPage', U.Common.toCamelCase(`page-${page.replace(/\//g, '-')}`) ];

        return (
			<div 
				ref={node => this.node = node}
				id="sidebarRight"
				className={[ 'sidebar', 'right', (page == 'type' ? 'withPreview' : '') ].join(' ')}
			>
				{Component ? (
					<div className={cn.join(' ')}>
						<Component 
							ref={ref => this.refChild = ref} 
							{...this.props} 
							rootId={rootId}
							details={details}
						/> 
					</div>
				): ''}
			</div>
		);
    };

});

export default SidebarRight;