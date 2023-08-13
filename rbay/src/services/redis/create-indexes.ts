import { SchemaFieldTypes } from 'redis';
import { client } from './client';
import { itemsIndexKey, itemsKey } from '$services/keys';

export const createIndexes = async () => {
	const indexes = await client.ft._list();

	const exists = indexes.find((index) => index === itemsIndexKey());

	if (exists) return;

	return client.ft.create(
		itemsIndexKey(),
		{
			name: {
				type: SchemaFieldTypes.TEXT,
				SORTABLE: true
			},
			description: {
				type: SchemaFieldTypes.TEXT,
				SORTABLE: false
			},
			ownerId: {
				type: SchemaFieldTypes.TAG,
				SORTABLE: false
			},
			endingAt: {
				type: SchemaFieldTypes.NUMERIC,
				SORTABLE: false
			},
			bids: {
				type: SchemaFieldTypes.NUMERIC,
				SORTABLE: false
			},
			views: {
				type: SchemaFieldTypes.NUMERIC,
				SORTABLE: false
			},
			price: {
				type: SchemaFieldTypes.NUMERIC,
				SORTABLE: false
			},
			likes: {
				type: SchemaFieldTypes.NUMERIC,
				SORTABLE: false
			}
		} as any,
		{
			ON: 'HASH',
			PREFIX: itemsKey('')
		}
	);
};
