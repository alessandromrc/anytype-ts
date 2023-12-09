import { I } from 'Lib';

export enum NotificationType {
	None	 = '',
	Import	 = 'import',
	Export	 = 'export',
	Invite	 = 'invite',
	Usecase	 = 'usecase',
	Gallery	 = 'galleryImport',
};

export enum NotificationStatus {
    Created	 = 0,
    Shown	 = 1,
    Read	 = 2,
    Replied	 = 3,
};

export enum NotificationAction {
    Close	 = 0,
};

export interface Notification {
	id: string;
	type: NotificationType;
	status: NotificationStatus;
	createTime: number;
	isLocal: boolean;
	payload: any;
};

export interface NotificationPayloadImport {
	processId: string;
	errorCode: number;
	importType: I.ImportType;
	spaceId: string;
	name: string;
};

export interface NotificationComponent {
	item: Notification;
	style?: any;
	onButton?: (e: any, action: string) => void;
	resize?: () => void;
};