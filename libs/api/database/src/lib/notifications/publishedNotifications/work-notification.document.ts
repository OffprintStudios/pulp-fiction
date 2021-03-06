import { WorkNotificationInfo } from '@dragonfish/shared/models/notifications';
import { NotificationDocument } from '../notifications.schema';

export interface WorkNotificationDocument extends WorkNotificationInfo, NotificationDocument {
    readonly _id: string;
}
