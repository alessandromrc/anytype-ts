import * as React from 'react';
import { Smile } from 'ts/component';
import { I, C } from 'ts/lib';
import { commonStore } from 'ts/store';
import { observer } from 'mobx-react';

interface Props extends I.BlockIcon {
	rootId: string;
};

const com = require('proto/commands.js');

@observer
class BlockIcon extends React.Component<Props, {}> {

	constructor (props: any) {
		super(props);
		
		this.onSelect = this.onSelect.bind(this);
	};

	render (): any {
		const { id, content } = this.props;
		const { name } = content;

		return (
			<React.Fragment>
				<Smile id={'block-icon-' + id} canEdit={true} size={32} icon={name} offsetX={68} offsetY={-64} onSelect={this.onSelect} className={'c64 ' + (commonStore.menuIsOpen('smile') ? 'active' : '')} />
			</React.Fragment>
		);
	};
	
	onSelect (icon: string) {
		const { id, rootId } = this.props;
		C.BlockSetIconName(rootId, id, icon);
	};
	
};

export default BlockIcon;