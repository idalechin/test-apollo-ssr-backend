import Bookshelf from '../config/db';

const ChannelInvitation = Bookshelf.Model.extend({
  tableName: 'channel_invitation',
	hasTimestamps: true
}, {});

export default Bookshelf.model('ChannelInvitation', ChannelInvitation);