import config from './config';
import knex from 'knex';
import bookshelf from 'bookshelf';
import jsonColumns from 'bookshelf-json-columns';

const Bookshelf = bookshelf(knex(config.db));
Bookshelf.plugin('registry');
Bookshelf.plugin('visibility');
Bookshelf.plugin('virtuals');
Bookshelf.plugin('pagination');
Bookshelf.plugin(jsonColumns);

export default Bookshelf;