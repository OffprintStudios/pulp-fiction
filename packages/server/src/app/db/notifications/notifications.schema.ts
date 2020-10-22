import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { NotificationKind, Notification } from '@pulp-fiction/models/notifications';

@Schema({
    'discriminatorKey': 'kind',
    'timestamps': true,
    autoIndex: true,
})
export class NotificationDocument extends Document implements Notification {    
    @Prop({required: true, index: true})
    destinationUserId: string;    
    
    @Prop({required: true})
    sourceId: string;

    @Prop({required: true, type: String, enum: Object.keys(NotificationKind), default: 'Comment'})
    kind: NotificationKind

    @Prop({required: true})
    title: string;

    @Prop()
    body?: string | undefined;

    @Prop({required: true, default: Date.now()})
    createdAt: Date;

    @Prop({required: true, default: Date.now()})
    updatedAt: Date
}

export const NotificationSchema = SchemaFactory.createForClass(NotificationDocument);